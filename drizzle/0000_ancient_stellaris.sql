CREATE TABLE IF NOT EXISTS "USERS" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"hashed_password" varchar NOT NULL,
	"isVerified" boolean DEFAULT false,
	"otp" integer
);
