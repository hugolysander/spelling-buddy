ALTER TABLE "leaderboard" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "leaderboard" ADD CONSTRAINT "leaderboard_name_unique" UNIQUE("name");