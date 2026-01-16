import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;
const isNeon = connectionString.includes("neon.tech");

const client = postgres(connectionString, {
  ssl: isNeon ? "require" : false,
});

export const db = drizzle(client, {
  schema,
});