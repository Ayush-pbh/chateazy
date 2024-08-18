import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/schema/schema.js",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        host: "ep-mute-frost-a1kqazil.ap-southeast-1.aws.neon.tech",
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: "basedb",
    },
});
