// src/routes/polls.ts
import { Router } from 'express';
import Poll from '../models/Poll';
import { verifyToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Create a new poll (protected)
router.post('/', verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    const newPoll = new Poll(req.body);
    const poll = await newPoll.save();
    return res.status(201).json(poll);
  } catch (error) {
    console.error("Error creating poll:", error);
    return res.status(500).json({ error: "Failed to create poll" });
  }
});

// Get all polls (public)
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find({});
    return res.json(polls);
  } catch (error) {
    console.error("Error retrieving polls:", error);
    return res.status(500).json({ error: "Error retrieving polls" });
  }
});

// Get poll details by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }
    return res.json(poll);
  } catch (error) {
    console.error("Error retrieving poll:", error);
    return res.status(500).json({ error: "Error retrieving poll" });
  }
});

// Get poll status (active or expired)
router.get('/:id/status', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }
    const currentTime = new Date();
    const status = currentTime > poll.expirationTime ? 'expired' : 'active';
    return res.json({ status });
  } catch (error) {
    console.error("Error retrieving poll status:", error);
    return res.status(500).json({ error: "Error retrieving poll status" });
  }
});

export default router;
