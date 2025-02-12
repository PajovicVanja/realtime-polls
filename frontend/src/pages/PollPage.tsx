// src/pages/PollPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import PollDetail from '../components/PollDetail';
import VoteChart from '../components/VoteChart';
import CommentSection from '../components/CommentSection';

const PollPage: React.FC = () => {
  const { pollId } = useParams<{ pollId: string }>();

  if (!pollId) {
    return <p>Poll ID is missing.</p>;
  }

  return (
    <div className="poll-page">
      <PollDetail pollId={pollId} />
      <VoteChart pollId={pollId} />
      <CommentSection pollId={pollId} />
    </div>
  );
};

export default PollPage;
