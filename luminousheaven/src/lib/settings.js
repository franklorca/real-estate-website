// luminousheaven/src/lib/settings.js
import db from "@/lib/db";

let tableEnsured = false;

async function ensureSettingsTable() {
  if (tableEnsured) return;

  try {
    const exists = await db.schema.hasTable("settings");
    if (!exists) {
      await db.schema.createTable("settings", (table) => {
        table.string("key", 128).primary();
        table.string("value", 255).notNullable();
        table.timestamp("updated_at").defaultTo(db.fn.now());
      });

      // Insert default membership_fee_enabled = true
      await db("settings").insert({
        key: "membership_fee_enabled",
        value: "true",
        updated_at: db.fn.now(),
      });
    }
    tableEnsured = true;
  } catch (error) {
    console.error("Error ensuring settings table exists:", error);
  }
}

export async function getSetting(key, defaultValue = "true") {
  await ensureSettingsTable();
  try {
    const record = await db("settings").where({ key }).first();
    if (record) {
      return record.value;
    }
    return defaultValue;
  } catch (error) {
    console.error(`Error reading setting key "${key}":`, error);
    return defaultValue;
  }
}

export async function setSetting(key, value) {
  await ensureSettingsTable();
  const strValue = String(value);
  try {
    const existing = await db("settings").where({ key }).first();
    if (existing) {
      await db("settings")
        .where({ key })
        .update({ value: strValue, updated_at: db.fn.now() });
    } else {
      await db("settings").insert({
        key,
        value: strValue,
        updated_at: db.fn.now(),
      });
    }
    return strValue;
  } catch (error) {
    console.error(`Error updating setting key "${key}":`, error);
    throw error;
  }
}
