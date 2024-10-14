'use client';

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Game from '@/components/Game'
import HoppingAnimals from '../../components/HoppingAnimals'  // Add this import
import styles from './GamePage.module.css'

export default function GamePage() {
  return <Suspense><GamePageContent /></Suspense>;
}

function GamePageContent() {
  const searchParams = useSearchParams()
  const grade = searchParams.get('grade')

  return (
    <div className={`${styles.gamePage} font-comic-sans relative`}>  {/* Add 'relative' class */}
      <Link href="/" className={`${styles.backButton} font-comic-sans`}>
        Back to Main Page
      </Link>
      <Link href={`/leaderboard?from=game&grade=${grade}`} className={`${styles.leaderboardButton} font-comic-sans`}>
        Leaderboard
      </Link>
      <Game grade={grade} />
      <HoppingAnimals />  {/* Add this line */}
    </div>
  )
}