'use client';

import { Suspense } from 'react'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './Leaderboard.module.css';
import HoppingAnimals from '../../components/HoppingAnimals';
import { getLeaderboard, LeaderboardEntry } from '../actions/leaderboard';
import AuthButtons from './AuthButtons';

export default function LeaderboardPage() {
  return <Suspense><LeaderboardPageContent /></Suspense>;
}

function LeaderboardPageContent() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const grade = searchParams.get('grade');

  const backHref = from === 'game' ? `/game?grade=${grade}` : '/';
  const backText = from === 'game' ? 'Back to Game' : 'Back to Main Page';

  useEffect(() => {
    async function fetchLeaderboard() {
      setLeaderboardData(await getLeaderboard());
    }
    fetchLeaderboard();
  }, []);

  const handleSignUpSuccess = async () => {
    setLeaderboardData(await getLeaderboard());
  };

  return (
    <div className={`${styles.leaderboardPage} font-comic-sans`}>
      <div className={styles.topBar}>
        <Link href={backHref} className={styles.backButton}>
          {backText}
        </Link>
      </div>
      <h1 className={styles.title}>Math Buddy Leaderboard</h1>
      <table className={styles.leaderboardTable}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index + 1}</td>
              <td>{entry.emoji} {entry.name}</td>
              <td>{entry.score}</td>
              <td>{entry.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.bottomToolBar}>
        <AuthButtons onSignUpSuccess={handleSignUpSuccess} />
      </div>
      <HoppingAnimals />
    </div>
  );
}