import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { TAX_DOCUMENTS } from "@/lib/tax/documents";

const DOC_IDS = new Set(TAX_DOCUMENTS.map((d) => d.id));

export const listSavedDocumentIds = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ document_id: string }>`
      select document_id from saved_documents where user_id = ${context.userId} order by created_at desc
    `;
    return rows.map((r) => r.document_id);
  });

export const toggleSavedDocument = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((documentId: string) => {
    const id = documentId.trim();
    if (!DOC_IDS.has(id)) throw new Error("Unknown document");
    return id;
  })
  .handler(async ({ context, data: documentId }) => {
    const sql = await getSql();
    const existing = await sql<{ id: number }>`
      select id from saved_documents where user_id = ${context.userId} and document_id = ${documentId}
    `;
    if (existing[0]) {
      await sql`delete from saved_documents where id = ${existing[0].id} and user_id = ${context.userId}`;
      return { saved: false as const };
    }
    await sql`insert into saved_documents (user_id, document_id) values (${context.userId}, ${documentId})`;
    return { saved: true as const };
  });
