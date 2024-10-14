'use client';

import React, { useState, useEffect, useCallback } from 'react'
import styles from './Game.module.css'

const WORD_LIST = [
  'apple', 'banana', 'cat', 'dog', 'elephant', 'frog', 'giraffe', 'house',
  'ice cream', 'jacket', 'kite', 'lemon', 'monkey', 'nest', 'orange', 'penguin',
  'queen', 'rabbit', 'sun', 'tree', 'umbrella', 'violin', 'water', 'xylophone',
  'yellow', 'zebra'
];

const Game: React.FC = () => {
  const [currentWord, setCurrentWord] = useState('')
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState('')

  const speakWord = useCallback((word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  }, []);

  const getRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    return WORD_LIST[randomIndex];
  }, []);

  const startNewRound = useCallback(() => {
    const newWord = getRandomWord();
    setCurrentWord(newWord);
    setUserInput('');
    speakWord(newWord);
    setMessage('');
  }, [getRandomWord, speakWord]);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      setScore(score + 1);
      setMessage('Correct! 🎉');
    } else {
      setMessage(`Incorrect. The correct spelling is "${currentWord}".`);
    }
    setTimeout(startNewRound, 2000);
  };

  const handleRepeatWord = () => {
    speakWord(currentWord);
  };

  return (
    <div className={styles.game}>
      <div className={styles.scoreBoard}>
        <h2>Spelling Buddy</h2>
        <p>Points: {score}</p>
      </div>
      <div className={styles.gameArea}>
        <button onClick={handleRepeatWord} className={styles.speakButton}>🔊 Speak Word</button>
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type the word here"
            className={styles.input}
            autoFocus
          />
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default Game;
