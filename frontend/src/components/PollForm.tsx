// src/components/PollForm.tsx
import React, { useState } from 'react';
import { createPoll } from '../services/pollService';
import { Poll } from '../utils/types';

const PollForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [expirationTime, setExpirationTime] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '']); // Start with two empty options
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const generateTempId = (): string => Math.random().toString(36).substring(2, 15);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || options.filter(opt => opt.trim() !== '').length < 2 || !expirationTime) {
      setError('Please fill in all fields with at least two options.');
      return;
    }
    try {
      const pollData = {
        title,
        expirationTime,
        options: options
          .filter(opt => opt.trim() !== '')
          .map(opt => ({
            id: generateTempId(),
            text: opt,
            votes: 0
          }))
      };
      const newPoll: Poll = await createPoll(pollData);
      setSuccessMessage('Poll created successfully!');
      setTitle('');
      setExpirationTime('');
      setOptions(['', '']);
      setError(null);
    } catch (err: any) {
      setError('Failed to create poll.');
    }
  };

  return (
    <div className="poll-form">
      <h2>Create New Poll</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Expiration Time:</label>
          <input 
            type="datetime-local" 
            value={expirationTime} 
            onChange={e => setExpirationTime(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={e => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
          <button type="button" onClick={addOption}>Add Option</button>
        </div>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};

export default PollForm;
