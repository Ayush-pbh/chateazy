import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import d from "dotenv";
d.config();
const pg_connection = neon(
    `postgresql://basedb_owner:${process.env.PGPASSWORD}@ep-rough-water-a108vdo5.ap-southeast-1.aws.neon.tech/basedb?sslmode=require`
);

const db = drizzle(pg_connection);

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: "drizzle/",
        });
        console.log("Migrations Successfull! ✅");
    } catch (error) {
        console.log("Migration Failed! ❌");
        console.log(error);
    }
};

main();
