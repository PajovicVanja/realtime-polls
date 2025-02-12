// src/hooks/usePoll.ts

import { useState, useEffect } from 'react';
import { Poll } from '../utils/types';
import { getPoll } from '../services/pollService';
import useSocket from './useSocket';

interface UsePollReturn {
  poll: Poll | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const usePoll = (pollId: string): UsePollReturn => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocket();

  const fetchPoll = async () => {
    try {
      setLoading(true);
      const pollData = await getPoll(pollId);
      setPoll(pollData);
      setError(null);
    } catch (err) {
      setError('Error fetching poll data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoll();
  }, [pollId]);

  useEffect(() => {
    if (socket) {
      const handleVoteUpdate = (data: { pollId: string; optionId: string }) => {
        if (data.pollId === pollId) {
          setPoll(prevPoll => {
            if (!prevPoll) return prevPoll;
            const updatedOptions = prevPoll.options.map(option =>
              option.id === data.optionId ? { ...option, votes: option.votes + 1 } : option
            );
            return { ...prevPoll, options: updatedOptions };
          });
        }
      };

      socket.on('voteUpdate', handleVoteUpdate);
      return () => {
        socket.off('voteUpdate', handleVoteUpdate);
      };
    }
  }, [socket, pollId]);

  return { poll, loading, error, refetch: fetchPoll };
};

export default usePoll;
