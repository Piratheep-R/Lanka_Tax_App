import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import type { TaxpayerType } from "@/lib/tax/rates";
import { TAXPAYER_TYPES } from "@/lib/tax/rates";

export type Profile = {
  userId: string;
  displayName: string | null;
  taxpayerType: TaxpayerType;
  monthlyIncome: number;
  otherIncome: number;
  hasRental: boolean;
  hasBusiness: boolean;
  hasInvestments: boolean;
  hasSolar: boolean;
  tin: string | null;
};

const TYPES = new Set(TAXPAYER_TYPES.map((t) => t.id));

function asBool(value: unknown) {
  return value === true || value === "t" || value === "true";
}

function mapRow(row: {
  user_id: string;
  display_name: string | null;
  taxpayer_type: string;
  monthly_income: number;
  other_income: number;
  has_rental: boolean | string;
  has_business: boolean | string;
  has_investments: boolean | string;
  has_solar: boolean | string;
  tin: string | null;
}): Profile {
  const taxpayerType = TYPES.has(row.taxpayer_type as TaxpayerType)
    ? (row.taxpayer_type as TaxpayerType)
    : "salaried";
  return {
    userId: row.user_id,
    displayName: row.display_name,
    taxpayerType,
    monthlyIncome: Number(row.monthly_income) || 0,
    otherIncome: Number(row.other_income) || 0,
    hasRental: asBool(row.has_rental),
    hasBusiness: asBool(row.has_business),
    hasInvestments: asBool(row.has_investments),
    hasSolar: asBool(row.has_solar),
    tin: row.tin,
  };
}

export const getProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      user_id: string;
      display_name: string | null;
      taxpayer_type: string;
      monthly_income: number;
      other_income: number;
      has_rental: boolean;
      has_business: boolean;
      has_investments: boolean;
      has_solar: boolean;
      tin: string | null;
    }>`select user_id, display_name, taxpayer_type, monthly_income, other_income, has_rental, has_business, has_investments, has_solar, tin from profiles where user_id = ${context.userId}`;
    if (rows[0]) return mapRow(rows[0]);
    await sql`insert into profiles (user_id) values (${context.userId})`;
    return mapRow({
      user_id: context.userId,
      display_name: null,
      taxpayer_type: "salaried",
      monthly_income: 0,
      other_income: 0,
      has_rental: false,
      has_business: false,
      has_investments: false,
      has_solar: false,
      tin: null,
    });
  });

export type ProfileUpdate = {
  displayName?: string;
  taxpayerType: TaxpayerType;
  monthlyIncome: number;
  otherIncome: number;
  hasRental: boolean;
  hasBusiness: boolean;
  hasInvestments: boolean;
  hasSolar: boolean;
  tin?: string;
};

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: ProfileUpdate) => {
    const monthlyIncome = Math.max(0, Math.round(Number(input.monthlyIncome) || 0));
    const otherIncome = Math.max(0, Math.round(Number(input.otherIncome) || 0));
    const taxpayerType = TYPES.has(input.taxpayerType)
      ? input.taxpayerType
      : "salaried";
    return {
      displayName: (input.displayName ?? "").trim().slice(0, 80) || null,
      taxpayerType,
      monthlyIncome,
      otherIncome,
      hasRental: Boolean(input.hasRental),
      hasBusiness: Boolean(input.hasBusiness),
      hasInvestments: Boolean(input.hasInvestments),
      hasSolar: Boolean(input.hasSolar),
      tin: (input.tin ?? "").trim().slice(0, 32) || null,
    };
  })
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into profiles (
        user_id, display_name, taxpayer_type, monthly_income, other_income,
        has_rental, has_business, has_investments, has_solar, tin, updated_at
      ) values (
        ${context.userId}, ${data.displayName}, ${data.taxpayerType}, ${data.monthlyIncome},
        ${data.otherIncome}, ${data.hasRental}, ${data.hasBusiness}, ${data.hasInvestments},
        ${data.hasSolar}, ${data.tin}, now()
      )
      on conflict (user_id) do update set
        display_name = excluded.display_name,
        taxpayer_type = excluded.taxpayer_type,
        monthly_income = excluded.monthly_income,
        other_income = excluded.other_income,
        has_rental = excluded.has_rental,
        has_business = excluded.has_business,
        has_investments = excluded.has_investments,
        has_solar = excluded.has_solar,
        tin = excluded.tin,
        updated_at = now()
    `;
    return { ok: true as const };
  });
