import { pgTable, serial, varchar, integer, text } from 'drizzle-orm/pg-core';

export const leaderboard = pgTable('leaderboard', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  score: integer('score').notNull(),
  grade: integer('grade').notNull(),
  emoji: varchar('emoji', { length: 10 }).notNull(),
});