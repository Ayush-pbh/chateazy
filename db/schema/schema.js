import {
    boolean,
    integer,
    pgTable,
    uuid,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";

// USERS table
export const USER = pgTable("USERS", {
    id: uuid("user_id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull(),
    hPassword: varchar("hashed_password").notNull(),
    isVerified: boolean("isVerified").default(false),
    otp: integer("otp"),
});

// CONVERSATIONS table
export const CONVERSATIONS = pgTable("CONVERSATIONS", {
    id: uuid("conv_id").defaultRandom().primaryKey(),
    type: varchar("conv_type"),
    name: varchar("conv_name"),
});

// USERS_CONVERSATIONS table (join table)
export const USERS_CONVERSATIONS = pgTable("USERS_CONVERSATIONS", {
    userId: uuid("user_id")
        .references(() => USER.id)
        .notNull(),
    conversationId: uuid("conversation_id")
        .references(() => CONVERSATIONS.id)
        .notNull(),
});

// MESSAGES table
export const MESSAGES = pgTable("MESSAGES", {
    id: uuid("message_id").defaultRandom().primaryKey(),
    conversationId: uuid("conversation_id")
        .references(() => CONVERSATIONS.id)
        .notNull(),
    senderId: uuid("sender_id")
        .references(() => USER.id)
        .notNull(),
    content: varchar("content").notNull(),
    type: varchar("type").notNull(), // Type can be 'text', 'img', 'video', etc.
    timestamp: timestamp("timestamp").defaultNow().notNull(), // Optional: to store the time the message was sent
});
