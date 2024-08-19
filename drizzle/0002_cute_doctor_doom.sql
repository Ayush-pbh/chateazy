DROP TABLE "USERS_CONVERSATIONS";--> statement-breakpoint
ALTER TABLE "CONVERSATIONS" ADD COLUMN "participant1_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "CONVERSATIONS" ADD COLUMN "participant2_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "CONVERSATIONS" DROP COLUMN IF EXISTS "conv_name";