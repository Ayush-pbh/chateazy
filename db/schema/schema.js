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
    participant1_id: uuid("participant1_id").notNull(),
    participant2_id: uuid("participant2_id").notNull(),
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
