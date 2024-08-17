import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import d from "dotenv";
d.config();

const client = new pg.Client({
    host: "ep-mute-frost-a1kqazil.ap-southeast-1.aws.neon.tech",
    port: 5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: "basedb",
    ssl: true,
});

client
    .connect()
    .then(() => {
        console.log("DB Connected ✅");
    })
    .catch((error) => {
        console.log("DB Connection Failed ❌");
        console.log(error);
    });

const db = drizzle(client);

export default db;
