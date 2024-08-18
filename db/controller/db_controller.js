import db from "../db_connect.js";

const insert = async (model, data) => {
    try {
        const newEntry = await db
            .insert(model)
            .values(data)
            .onConflictDoNothing()
            .returning();
        console.log("Database Insertion Success ✅");
        return newEntry;
    } catch (error) {
        console.log("Database Insertion Failed ❌");
        return false;
    }
};
const select = async (model, filter) => {
    try {
        const selectedEntry = await db.select().from(model).where(filter);
        console.log("Database Insertion Success ✅");
        return selectedEntry;
    } catch (error) {
        console.log("Database Selection Failed ❌");
        return false;
    }
};
const update = async (model, filter, data) => {
    try {
        const updatedEntry = await db
            .update(model)
            .set(data)
            .where(filter)
            .returning();
        console.log("Database Updation Success ✅");
        return updatedEntry;
    } catch (error) {
        console.log("Database Updation Failed ❌");
        return false;
    }
};

const deleteDB = async (model, filter) => {
    try {
        const deletedEntry = await db.delete(model).where(filter).returning();
        console.log("Database Updation Success ✅");
        return deletedEntry;
    } catch (error) {
        console.log("Database Updation Failed ❌");
        return false;
    }
};

export {
    insert as INSERTDB,
    select as SELECTDB,
    update as UPDATEDB,
    deleteDB as DELETEDB,
};
