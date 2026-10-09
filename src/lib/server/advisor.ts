import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { ADVISOR_SYSTEM_PROMPT } from "@/lib/tax/advisor-prompt";

export type AdvisorMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

const MAX_HISTORY = 16;
const MAX_QUESTION = 1200;

export const listAdvisorMessages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      role: string;
      content: string;
      created_at: string;
    }>`
      select id, role, content, created_at
      from advisor_messages
      where user_id = ${context.userId}
      order by created_at asc, id asc
    `;
    return rows
      .filter((r) => r.role === "user" || r.role === "assistant")
      .map((r) => ({
        id: Number(r.id),
        role: r.role as "user" | "assistant",
        content: r.content,
        createdAt: String(r.created_at),
      }));
  });

export const askAdvisor = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { question: string; profileNote?: string }) => {
    const question = input.question.trim().slice(0, MAX_QUESTION);
    if (!question) throw new Error("Ask a tax question first.");
    return {
      question,
      profileNote: (input.profileNote ?? "").trim().slice(0, 400),
    };
  })
  .handler(async ({ context, data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI advisor is unavailable right now." };
    }

    const sql = await getSql();
    await sql`
      insert into advisor_messages (user_id, role, content)
      values (${context.userId}, ${"user"}, ${data.question})
    `;

    const prior = await sql<{ role: string; content: string }>`
      select role, content from advisor_messages
      where user_id = ${context.userId}
      order by created_at desc, id desc
      limit ${MAX_HISTORY}
    `;
    const history = [...prior].reverse();

    const messages: { role: "system" | "user" | "assistant"; content: string }[] =
      [
        { role: "system", content: ADVISOR_SYSTEM_PROMPT },
      ];
    if (data.profileNote) {
      messages.push({
        role: "system",
        content: `Taxpayer profile for this user (they entered it): ${data.profileNote}`,
      });
    }
    for (const row of history) {
      if (row.role === "user" || row.role === "assistant") {
        messages.push({
          role: row.role,
          content: row.content,
        });
      }
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        messages,
        max_tokens: 700,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `Advisor could not answer (${res.status}).` };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text =
      body.choices?.[0]?.message?.content?.trim() ||
      "I could not form an answer. Try a more specific Sri Lankan tax question.";

    await sql`
      insert into advisor_messages (user_id, role, content)
      values (${context.userId}, ${"assistant"}, ${text})
    `;

    return { ok: true as const, text };
  });
