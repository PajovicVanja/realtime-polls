// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { getProfile } from '../services/authService';
import { User } from '../utils/types';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile();
        setProfile(userData);
      } catch (err: any) {
        setError('Failed to load profile.');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="profile">
        <p>{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <h1>Your Profile</h1>
      <p>
        <strong>Username:</strong> {profile.username}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      {/* Future: Display additional user info and their polls/votes here */}
    </div>
  );
};

export default Profile;
