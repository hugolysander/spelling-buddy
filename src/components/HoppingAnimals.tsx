import React from 'react';
import styles from './HoppingAnimals.module.css';

const animals = ['🐶', '🐱', '🐰', '🦊', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵'];

const HoppingAnimals: React.FC = () => {
  return (
    <div className={styles.animalContainer}>
      {animals.map((animal, index) => (
        <div 
          key={index} 
          className={styles.animal} 
          style={{ 
            animationDelay: `${index * 0.5}s`,
            left: `${(index / animals.length) * 100}%`
          }}
        >
          {animal}
        </div>
      ))}
    </div>
  );
};

export default HoppingAnimals;