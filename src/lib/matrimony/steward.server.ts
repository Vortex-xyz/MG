import { getSql } from "@/lib/db";

export const STEWARD_USERNAME = "archivist";
export const STEWARD_EMAIL = "archivist@kumkum.house";
export const STEWARD_PASSWORD = "house-ledger-1847";

let pending: Promise<void> | null = null;

export function ensureSteward(): Promise<void> {
  if (!pending) {
    pending = seedSteward().catch((err) => {
      pending = null;
      throw err;
    });
  }
  return pending;
}

async function seedSteward(): Promise<void> {
  const sql = await getSql();
  const existing = await sql<{ id: string }>`
    select id from "user" where lower(email) = ${STEWARD_EMAIL} limit 1
  `;
  if (existing.length > 0) return;
  const { auth } = await import("@/lib/auth/server");
  try {
    await auth.api.signUpEmail({
      body: {
        name: "Archivist",
        email: STEWARD_EMAIL,
        password: STEWARD_PASSWORD,
      },
    });
  } catch (err) {
    const again = await sql<{ id: string }>`
      select id from "user" where lower(email) = ${STEWARD_EMAIL} limit 1
    `;
    if (again.length === 0) throw err;
  }
}

export async function isStewardUser(userId: string): Promise<boolean> {
  const sql = await getSql();
  const rows = await sql<{ email: string }>`
    select email from "user" where id = ${userId} limit 1
  `;
  return (rows[0]?.email ?? "").toLowerCase() === STEWARD_EMAIL;
}
