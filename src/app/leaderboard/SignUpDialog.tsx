'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';
import styles from './Leaderboard.module.css';

const emojis = ['😀', '😎', '🤓', '🦄', '🐶', '🐱', '🐼', '🐨', '🦁', '🐯'];

export default function SignUpDialog({
  onClose, 
  onSignUpSuccess
}: {
  onClose: () => void,
  onSignUpSuccess: () => void
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [emoji, setEmoji] = useState('');
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(username, password, parseInt(grade), emoji);
    onSignUpSuccess(); // Call this function to trigger a leaderboard refresh
    onClose();
  };

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <h2 className={styles.dialogTitle}>Sign Up</h2>
        <form onSubmit={handleSubmit} className={styles.dialogForm}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.dialogInput}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.dialogInput}
          />
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
            className={styles.dialogInput}
          >
            <option value="">Select Grade</option>
            {[1, 2, 3, 4, 5, 6].map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>
          <div className={styles.emojiPicker}>
            {emojis.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEmoji(e)}
                className={`${styles.emojiButton} ${emoji === e ? styles.selectedEmoji : ''}`}
              >
                {e}
              </button>
            ))}
          </div>
          <button type="submit" className={styles.dialogButton}>Sign Up</button>
        </form>
        <button onClick={onClose} className={styles.dialogCloseButton}>Close</button>
      </div>
    </div>
  );
}