// src/services/commentService.ts

import api from './api';
import { Comment } from '../utils/types';

/**
 * Retrieves all comments for a specific poll.
 * @param pollId - The ID of the poll.
 */
export const getComments = async (pollId: string): Promise<Comment[]> => {
  const response = await api.get(`/comments/${pollId}`);
  return response.data;
};

/**
 * Posts a new comment to a poll.
 * @param pollId - The ID of the poll.
 * @param text - The comment text.
 */
export const postComment = async (pollId: string, text: string): Promise<Comment> => {
  const response = await api.post(`/comments/${pollId}`, { text });
  return response.data;
};
