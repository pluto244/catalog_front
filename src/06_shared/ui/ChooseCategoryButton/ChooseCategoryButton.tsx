import React from 'react';
import css from './ChooseCategoryButton.module.css';

interface ChooseCategoryButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

export const ChooseCategoryButton: React.FC<ChooseCategoryButtonProps> = ({ isActive, onClick, label }) => {
  return (
    <button onClick={onClick} className={`${css.button} ${isActive ? css.active : ''}`}>
      {label}
    </button>
  );
};
