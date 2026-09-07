// db.ts
import dotenv from "dotenv";
import { Pool, QueryResult, QueryResultRow } from "pg";
dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

export const pool = new Pool({
  connectionString,
  max: 20,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

pool.on("error", (err) => {
  console.error("[db] Unexpected error on idle client:", err.message);
});

export interface UserRow {
  id: number;
  name: string;
  email: string;
}

/**
 * Fetches a user by id.
 * Returns undefined if no user matches — caller must handle that case.
 * Throws if id is invalid (not a positive integer) or the query fails.
 */
export async function getUser(id: number): Promise<UserRow | undefined> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(`Invalid user id: ${id}`);
  }

  try {
    const result: QueryResult<UserRow> = await pool.query<UserRow>(
      "SELECT id, name, email FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("[db] getUser query failed:", { id, error: (err as Error).message });
    throw err;
  }
}

// Graceful shutdown — closes the pool cleanly instead of letting
// in-flight queries get killed when the process exits (e.g. on deploy/restart)
async function shutdown(signal: string) {
  console.log(`[db] ${signal} received, closing pool...`);
  try {
    await pool.end();
    console.log("[db] Pool closed cleanly.");
  } catch (err) {
    console.error("[db] Error closing pool:", (err as Error).message);
  } finally {
    process.exit(0);
  }
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
