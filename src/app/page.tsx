'use client';

import Link from 'next/link'
import styles from './Home.module.css'

export default function Home() {
  const grades = ['Grade 1', 'Grade 2', 'Grade 3'];

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Welcome to Math Buddy</h1>
      <p className={styles.subtitle}>A fun math game for kids!</p>
      <div className={styles.characters}>
        <span role="img" aria-label="Smiling face" className={styles.emoji}>😊</span>
        <span role="img" aria-label="Rainbow" className={styles.emoji}>🌈</span>
        <span role="img" aria-label="Star" className={styles.emoji}>⭐</span>
      </div>
      <div className={styles.gradeButtons}>
        {grades.map((grade, index) => (
          <Link key={index} href={`/game?grade=${index + 1}`} className={styles.gradeButton}>
            {grade}
          </Link>
        ))}
      </div>
      <Link href="/leaderboard" className={styles.leaderboardButton}>
        View Leaderboard
      </Link>
    </div>
  )
}