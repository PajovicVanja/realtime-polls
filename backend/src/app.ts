// src/app.ts
import dotenv from 'dotenv';

// Load environment variables based on the NODE_ENV
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import pollRoutes from './routes/polls';
import voteRoutes from './routes/votes';
import userRoutes from './routes/users';
import commentRoutes from './routes/comments';

const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MongoDB URI is not defined in the environment variables.');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/polls', pollRoutes);
app.use('/votes', voteRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);

export default app;
