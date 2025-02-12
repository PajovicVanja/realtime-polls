// src/pages/CreatePoll.tsx
import React from 'react';
import PollForm from '../components/PollForm';

const CreatePoll: React.FC = () => {
  return (
    <div className="create-poll">
      <h1>Create a New Poll</h1>
      <PollForm />
    </div>
  );
};

export default CreatePoll;
