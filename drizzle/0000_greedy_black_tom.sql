CREATE TABLE IF NOT EXISTS "leaderboard" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"score" integer NOT NULL,
	"grade" integer NOT NULL,
	"emoji" varchar(10) NOT NULL
);
