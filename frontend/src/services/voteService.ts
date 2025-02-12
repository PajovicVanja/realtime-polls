// src/services/voteService.ts
import api from './api';

interface VoteRequest {
  pollId: string;
  optionId: string;
  userId?: string; // Optional for anonymous voting
}

/**
 * Casts a vote for a specific poll option.
 */
export const castVote = async (voteData: VoteRequest): Promise<{ message: string }> => {
  const response = await api.post('/votes', voteData);
  return response.data;
};

/**
 * Removes a user's vote for a specific poll.
 */
export const removeVote = async (pollId: string, userId: string): Promise<{ message: string }> => {
  const response = await api.delete('/votes', { data: { pollId, userId } });
  return response.data;
};

/**
 * Retrieves the vote record for a given poll and user.
 */
export const getUserVote = async (pollId: string, userId: string): Promise<{ optionId: string }> => {
  const response = await api.get('/votes/user', { params: { pollId, userId } });
  return response.data;
};
