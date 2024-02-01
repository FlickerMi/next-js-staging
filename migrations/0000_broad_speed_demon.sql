CREATE SCHEMA "s_auth";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "s_auth"."guestbook" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
