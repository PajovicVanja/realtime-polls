// src/components/PollList.tsx
import React from 'react';
import { Poll } from '../utils/types';
import { Link } from 'react-router-dom';

interface PollListProps {
  polls: Poll[];
}

const PollList: React.FC<PollListProps> = ({ polls }) => {
  return (
    <div className="poll-list">
      <h2>Available Polls</h2>
      {polls.length === 0 ? (
        <p>No polls available.</p>
      ) : (
        <div className="poll-cards">
          {polls.map(poll => (
            <Link to={`/poll/${poll._id}`} className="poll-card" key={poll._id}>
              <h3>{poll.title}</h3>
              <p>Expires: {new Date(poll.expirationTime).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PollList;
