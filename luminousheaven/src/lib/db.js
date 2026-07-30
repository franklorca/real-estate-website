// luminousheaven/src/lib/db.js
import knex from "knex";

let dbInstance = null;

export function getDb() {
  if (!dbInstance) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set in environment variables.");
    }

    dbInstance = knex({
      client: "pg",
      connection: {
        connectionString,
        ssl: { rejectUnauthorized: false },
      },
      pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 30000,
        acquireTimeoutMillis: 30000,
      },
    });
  }
  return dbInstance;
}

export default getDb();
