'use server';

import { db } from '@/db';
import { leaderboard } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function login(username: string, password: string) {
  const users = await db.select().from(leaderboard).where(eq(leaderboard.name, username)).limit(1);
  if (users.length === 0) throw new Error('User not found');

  const user = users[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '90d' });
  return {
    id: user.id,
    name: user.name,
    grade: user.grade,
    emoji: user.emoji,
    token,
  };
}

export async function signUp(username: string, password: string, grade: number, emoji: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [user] = await db.insert(leaderboard).values({
    name: username,
    password: hashedPassword,
    grade,
    emoji,
    score: 0,
  }).returning();

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '90d' });
  return {
    id: user.id,
    name: user.name,
    grade: user.grade,
    emoji: user.emoji,
    token,
  };
}

export async function logout() {
  // Client-side logout is handled in the AuthContext
}
