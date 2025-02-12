// src/components/PollDetail.tsx
import React, { useState, useEffect } from 'react';
import usePoll from '../hooks/usePoll';
import { castVote, removeVote, getUserVote } from '../services/voteService';
import OptionCard from './OptionCard';
import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';

interface PollDetailProps {
  pollId: string;
}

const PollDetail: React.FC<PollDetailProps> = ({ pollId }) => {
  const { poll, loading, error, refetch } = usePoll(pollId);
  const { user } = useAuth();
  const { socket } = useSocket();
  // Track the optionId the current user has voted for (if any)
  const [userVote, setUserVote] = useState<string | null>(null);

  useEffect(() => {
    if (socket && pollId) {
      socket.emit('joinPoll', pollId);
    }
  }, [socket, pollId]);
  useEffect(() => {
    const fetchUserVote = async () => {
      if (user) {
        try {
          const voteRecord = await getUserVote(pollId, user._id);
          setUserVote(voteRecord.optionId);
        } catch (err: any) {
        }
      }
    };
    fetchUserVote();
  }, [pollId, user]);

  

  useEffect(() => {
    if (socket) {
      const handleVoteUpdate = (data: { pollId: string; optionId: string }) => {
        if (data.pollId === pollId) {
          refetch();
        }
      };

      socket.on('voteUpdate', handleVoteUpdate);
      return () => {
        socket.off('voteUpdate', handleVoteUpdate);
      };
    }
  }, [socket, pollId, refetch]);

  if (loading) return <p>Loading poll details...</p>;
  if (error || !poll) return <p>Error loading poll details.</p>;

  const currentTime = new Date();
  const pollExpiration = new Date(poll.expirationTime);
  const isExpired = currentTime > pollExpiration;
  const status = isExpired ? 'Expired' : 'Active';

  const handleVote = async (optionId: string) => {
    if (!user) {
      alert("Please log in or sign up to vote.");
      return;
    }
    if (isExpired) {
      alert("Poll is expired. Voting is no longer allowed.");
      return;
    }
    try {
      if (!userVote) {
        await castVote({ pollId, optionId, userId: user._id });
        setUserVote(optionId);
      } else if (userVote === optionId) {
        await removeVote(pollId, user._id);
        setUserVote(null);
      } else {
        await removeVote(pollId, user._id);
        await castVote({ pollId, optionId, userId: user._id });
        setUserVote(optionId);
      }
      refetch();
    } catch (err) {
      console.error("Error processing vote:", err);
      alert("Failed to process vote.");
    }
  };

  return (
    <div className="poll-detail">
      <h2>{poll.title}</h2>
      <p>Status: {status}</p>
      <div className="poll-options">
        {poll.options.map(option => (
          <OptionCard
            key={option.id}
            option={option}
            onVote={handleVote}
            disabled={isExpired}
            isSelected={userVote === option.id}
          />
        ))}
      </div>
    </div>
  );
};

export default PollDetail;
