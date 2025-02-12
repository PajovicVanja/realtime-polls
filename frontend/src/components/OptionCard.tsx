// src/components/OptionCard.tsx
import React from 'react';

interface OptionCardProps {
  option: {
    id: string;
    text: string;
    votes: number;
  };
  onVote: (optionId: string) => void;
  disabled?: boolean;
  isSelected?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, onVote, disabled = false, isSelected = false }) => {
  return (
    <div className={`option-card ${isSelected ? 'selected' : ''}`}>
      <p>{option.text}</p>
      <p>{option.votes} votes</p>
      <button onClick={() => onVote(option.id)} disabled={disabled}>
        {isSelected ? 'Remove Vote' : 'Vote'}
      </button>
    </div>
  );
};

export default OptionCard;
