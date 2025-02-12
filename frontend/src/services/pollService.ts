// src/services/pollService.ts
import api from './api';
import { Poll } from '../utils/types';

/**
 * Creates a new poll.
 * @param pollData - Data for the new poll.
 */
export const createPoll = async (pollData: Partial<Poll>): Promise<Poll> => {
  const response = await api.post('/polls', pollData);
  return response.data;
};

/**
 * Retrieves poll details by poll ID.
 */
export const getPoll = async (pollId: string): Promise<Poll> => {
  const response = await api.get(`/polls/${pollId}`);
  return response.data;
};

/**
 * Retrieves the status of a poll (active or expired).
 */
export const getPollStatus = async (pollId: string): Promise<{ status: string }> => {
  const response = await api.get(`/polls/${pollId}/status`);
  return response.data;
};

/**
 * Retrieves a list of all polls.
 * Note: Ensure your backend supports a GET /polls endpoint.
 */
export const getPolls = async (): Promise<Poll[]> => {
  const response = await api.get('/polls');
  return response.data;
};
