// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Poll } from '../utils/types';
import { getPolls } from '../services/pollService';
import PollList from '../components/PollList';

const Home: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const pollsData = await getPolls();
        setPolls(pollsData);
      } catch (err) {
        setError('Failed to fetch polls.');
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  return (
    <div className="home">
      <h1>Poll App Home</h1>
      <p>Welcome to the Poll App! Discover featured polls and get started.</p>
      {loading ? (
        <p>Loading polls...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <PollList polls={polls} />
      )}
    </div>
  );
};

export default Home;
