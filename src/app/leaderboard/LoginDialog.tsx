'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';
import styles from './Leaderboard.module.css';

export default function LoginDialog({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
    onClose();
  };

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <h2 className={styles.dialogTitle}>Log In</h2>
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
          <button type="submit" className={styles.dialogButton}>Log In</button>
        </form>
        <button onClick={onClose} className={styles.dialogCloseButton}>Close</button>
      </div>
    </div>
  );
}