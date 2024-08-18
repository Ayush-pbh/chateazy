CREATE TABLE IF NOT EXISTS "CONVERSATIONS" (
	"conv_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conv_type" varchar,
	"conv_name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MESSAGES" (
	"message_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"sender_id" uuid NOT NULL,
	"content" varchar NOT NULL,
	"type" varchar NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "USERS_CONVERSATIONS" (
	"user_id" uuid NOT NULL,
	"conversation_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "MESSAGES" ADD CONSTRAINT "MESSAGES_conversation_id_CONVERSATIONS_conv_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."CONVERSATIONS"("conv_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "MESSAGES" ADD CONSTRAINT "MESSAGES_sender_id_USERS_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."USERS"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "USERS_CONVERSATIONS" ADD CONSTRAINT "USERS_CONVERSATIONS_user_id_USERS_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."USERS"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "USERS_CONVERSATIONS" ADD CONSTRAINT "USERS_CONVERSATIONS_conversation_id_CONVERSATIONS_conv_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."CONVERSATIONS"("conv_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
