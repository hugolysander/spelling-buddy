'use server';

import { db } from '@/db';
import { leaderboard } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export type LeaderboardEntry = {
  id?: number;
  name: string;
  score: number;
  grade: number;
  emoji: string;
};

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  return db.select().from(leaderboard).orderBy(desc(leaderboard.score));
}

export async function incrementLeaderboardEntry(token: string): Promise<LeaderboardEntry | null> {
  const userId = verifyToken(token);
  if (!userId) return null;

  const [currentEntry] = await db
    .select()
    .from(leaderboard)
    .where(eq(leaderboard.id, userId));

  const [updatedEntry] = await db
    .update(leaderboard)
    .set({ score: currentEntry.score + 1 })
    .where(eq(leaderboard.id, userId))
    .returning();
  return updatedEntry || null;
}

function verifyToken(token: string): number | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    return decoded.userId;
  } catch (error) {
    return null;
  }
}
