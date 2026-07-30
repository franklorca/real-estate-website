// luminousheaven/scripts/migrate-users.js
const fs = require("fs");
const path = require("path");
const knex = require("knex");

// Parse .env.local manually if process.env.DATABASE_URL is not set
if (!process.env.DATABASE_URL) {
  const envPath = path.join(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, "utf8");
    envFile.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value;
      }
    });
  }
}

async function runMigration() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("FATAL: DATABASE_URL is missing.");
    process.exit(1);
  }

  const db = knex({
    client: "pg",
    connection: {
      connectionString,
      ssl: { rejectUnauthorized: false },
    },
  });

  console.log("=== STARTING SAFE, IDEMPOTENT USER MIGRATION ===");

  try {
    // 1. Ensure Better-Auth tables exist without touching original 'users' table
    await db.schema.hasTable("user").then(async (exists) => {
      if (!exists) {
        console.log("Creating 'user' table for Better-Auth...");
        await db.schema.createTable("user", (table) => {
          table.text("id").primary();
          table.text("name").notNullable();
          table.text("email").notNullable().unique();
          table.boolean("emailVerified").defaultTo(false);
          table.text("image");
          table.timestamp("createdAt").defaultTo(db.fn.now());
          table.timestamp("updatedAt").defaultTo(db.fn.now());
          table.text("role").defaultTo("member");
          table.text("membership_status").defaultTo("active");
        });
      }
    });

    await db.schema.hasTable("session").then(async (exists) => {
      if (!exists) {
        console.log("Creating 'session' table for Better-Auth...");
        await db.schema.createTable("session", (table) => {
          table.text("id").primary();
          table.timestamp("expiresAt").notNullable();
          table.text("token").notNullable().unique();
          table.timestamp("createdAt").defaultTo(db.fn.now());
          table.timestamp("updatedAt").defaultTo(db.fn.now());
          table.text("ipAddress");
          table.text("userAgent");
          table.text("userId").notNullable().references("id").inTable("user").onDelete("CASCADE");
        });
      }
    });

    await db.schema.hasTable("account").then(async (exists) => {
      if (!exists) {
        console.log("Creating 'account' table for Better-Auth...");
        await db.schema.createTable("account", (table) => {
          table.text("id").primary();
          table.text("accountId").notNullable();
          table.text("providerId").notNullable();
          table.text("userId").notNullable().references("id").inTable("user").onDelete("CASCADE");
          table.text("accessToken");
          table.text("refreshToken");
          table.text("idToken");
          table.timestamp("accessTokenExpiresAt");
          table.timestamp("refreshTokenExpiresAt");
          table.text("scope");
          table.text("password");
          table.timestamp("createdAt").defaultTo(db.fn.now());
          table.timestamp("updatedAt").defaultTo(db.fn.now());
        });
      }
    });

    await db.schema.hasTable("verification").then(async (exists) => {
      if (!exists) {
        console.log("Creating 'verification' table for Better-Auth...");
        await db.schema.createTable("verification", (table) => {
          table.text("id").primary();
          table.text("identifier").notNullable();
          table.text("value").notNullable();
          table.timestamp("expiresAt").notNullable();
          table.timestamp("createdAt").defaultTo(db.fn.now());
          table.timestamp("updatedAt").defaultTo(db.fn.now());
        });
      }
    });

    // 2. Fetch existing users from original 'users' table (READ ONLY)
    const existingUsers = await db("users").select("*");
    console.log(`Found ${existingUsers.length} existing users in original 'users' table.`);

    // 3. Migrate users into Better-Auth 'user' and 'account' tables within a transaction
    await db.transaction(async (trx) => {
      for (const u of existingUsers) {
        const userIdStr = String(u.id);

        const alreadyInUser = await trx("user").where({ email: u.email }).first();

        if (!alreadyInUser) {
          await trx("user").insert({
            id: userIdStr,
            name: u.name,
            email: u.email,
            emailVerified: true,
            role: u.role || "member",
            membership_status: u.membership_status || "active",
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          if (u.password_hash) {
            await trx("account").insert({
              id: `account_${userIdStr}`,
              userId: userIdStr,
              accountId: u.email,
              providerId: "credential",
              password: u.password_hash,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }

          console.log(`[SYNCED] User #${u.id} (${u.email}) -> Better-Auth schema.`);
        } else {
          console.log(`[SKIP] User #${u.id} (${u.email}) already present in Better-Auth schema.`);
        }
      }
    });

    console.log("=== MIGRATION COMPLETED SUCCESSFULLY WITH ZERO LOSS ===");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await db.destroy();
  }
}

runMigration();
