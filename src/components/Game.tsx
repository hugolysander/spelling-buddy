'use client';

import { useState, useEffect, useCallback } from 'react'
import Confetti from 'react-confetti'
import styles from './Game.module.css'
import { useAuth } from '../app/leaderboard/AuthContext'
import { incrementLeaderboardEntry } from '../app/actions/leaderboard'

type Operation = '+' | '-' | '×' | '÷'

type GameProps = {
  grade: string | null;
};

export default function Game({ grade }: GameProps) {
  const { user } = useAuth()
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const playCorrectSound = useCallback(() => {
    const audio = new Audio('/sounds/yay.mp3');
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }, []);

  const generateQuestion = useCallback(() => {
    let operations: Operation[]
    let num1: number, num2: number

    switch (grade) {
      case '2':
        operations = ['+', '-']
        num1 = Math.floor(Math.random() * 20) + 1
        num2 = Math.floor(Math.random() * 20) + 1
        break
      case '3':
        operations = ['×', '÷']
        if (Math.random() < 0.5) {
          num1 = Math.floor(Math.random() * 10) + 1
          num2 = Math.floor(Math.random() * 10) + 1
        } else {
          num2 = Math.floor(Math.random() * 10) + 1
          num1 = num2 * (Math.floor(Math.random() * 10) + 1)
        }
        break
      default: // Grade 1 or fallback
        operations = ['+', '-']
        num1 = Math.floor(Math.random() * 10) + 1
        num2 = Math.floor(Math.random() * 10) + 1
        break
    }

    const operation = operations[Math.floor(Math.random() * operations.length)]

    // Ensure num1 is always greater than or equal to num2 for subtraction
    if (operation === '-') {
      [num1, num2] = [Math.max(num1, num2), Math.min(num1, num2)]
    }

    setQuestion(`${num1} ${operation} ${num2} = ?`)
    setCorrectAnswer(eval(`${num1} ${operation === '×' ? '*' : operation === '÷' ? '/' : operation} ${num2}`))
    setAnswer('')
  }, [grade])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (parseInt(answer) === correctAnswer) {
      const newScore = score + 1
      setScore(newScore)
      setShowConfetti(true)
      setFeedback('Correct! Great job!')
      playCorrectSound()

      // Update leaderboard if user is logged in
      if (user) {
        try {
          const token = localStorage.getItem('token')
          if (token) {
            await incrementLeaderboardEntry(token)
          }
        } catch (error) {
          console.error('Error updating leaderboard:', error)
        }
      }

      setTimeout(() => {
        setShowConfetti(false)
        setFeedback(null)
      }, 3000)
    } else {
      setFeedback(`Oops! The correct answer was ${correctAnswer}. Try again!`)
      setTimeout(() => setFeedback(null), 3000)
    }
    generateQuestion()
  }

  useEffect(() => {
    generateQuestion()
  }, [generateQuestion])

  const getBackgroundClass = () => {
    switch (grade) {
      case '2':
        return styles.backgroundGrade2
      case '3':
        return styles.backgroundGrade3
      default:
        return styles.backgroundGrade1
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen py-2 ${getBackgroundClass()} overflow-hidden font-comic-sans relative`}>
      <h1 className="text-4xl font-bold mb-4 text-purple-700 z-10">Math Buddy Game</h1>
      <p className="text-2xl mb-4 text-green-600 z-10">Score: {score}</p>
      <div className="text-3xl mb-4 text-blue-600 font-semibold z-10">{question}</div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center z-10">
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border-2 border-purple-400 p-2 rounded-md text-xl mb-4 text-black bg-white font-comic-sans"
          placeholder="Enter your answer"
        />
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-600 transform hover:scale-105 transition duration-200 font-comic-sans"
        >
          Submit
        </button>
      </form>
      {feedback && (
        <div className={`mt-4 p-2 rounded-md z-10 font-comic-sans ${feedback.startsWith('Correct') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
          {feedback}
        </div>
      )}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </div>
  )
}