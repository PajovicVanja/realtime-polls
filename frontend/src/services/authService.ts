// src/services/authService.ts

import api from './api';
import { User } from '../utils/types';

interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Signs up a new user.
 */
export const signup = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const response = await api.post('/users/signup', { username, email, password });
  return response.data;
};

/**
 * Logs in an existing user.
 */
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

/**
 * Retrieves the profile of the logged-in user.
 */
export const getProfile = async (): Promise<User> => {
  const response = await api.get('/users/profile');
  return response.data;
};

/**
 * Updates the profile of the logged-in user.
 * @param updateData - Partial user data to update. Include password if updating.
 */
export const updateProfile = async (
  updateData: Partial<User> & { password?: string }
): Promise<User> => {
  const response = await api.put('/users/profile', updateData);
  return response.data;
};
