'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';
import LoginDialog from './LoginDialog';
import SignUpDialog from './SignUpDialog';
import styles from './Leaderboard.module.css';

export default function AuthButtons({
  onSignUpSuccess
}: {
  onSignUpSuccess: () => void
}) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className={styles.authButtons}>
        <span>Welcome, {user.name}!</span>
        <button onClick={logout} className={styles.authButton}>Logout</button>
      </div>
    );
  }

  return (
    <div className={styles.authButtons}>
      <button onClick={() => setShowLogin(true)} className={styles.authButton}>Log In</button>
      <button onClick={() => setShowSignUp(true)} className={styles.authButton}>Sign Up</button>
      {showLogin && <LoginDialog onClose={() => setShowLogin(false)} />}
      {showSignUp && <SignUpDialog onClose={() => setShowSignUp(false)} onSignUpSuccess={onSignUpSuccess} />}
    </div>
  );
}