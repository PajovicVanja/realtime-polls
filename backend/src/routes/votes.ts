// src/routes/votes.ts
import { Router } from 'express';
import Poll from '../models/Poll';
import Vote from '../models/Vote';

const router = Router();

// Cast a vote
router.post('/', async (req, res) => {
  try {
    const { pollId, optionId, userId } = req.body; 

    // Find the poll
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    // Check if the poll has expired
    if (new Date() > poll.expirationTime) {
      return res.status(400).json({ error: "Poll has expired" });
    }

    // Update the vote count for the selected option
    let optionFound = false;
    poll.options = poll.options.map(option => {
      if (option.id === optionId) {
        optionFound = true;
        return { ...option, votes: option.votes + 1 };
      }
      return option;
    });
    if (!optionFound) {
      return res.status(400).json({ error: "Invalid optionId" });
    }
    await poll.save();

    // Create a vote record
    const newVote = new Vote({ pollId, optionId, userId });
    await newVote.save();

    // Emit a real-time update via Socket.io
    const io = req.app.get('socketio');
    if (io) {
      io.to(pollId).emit('voteUpdate', { pollId, optionId });
    }

    return res.json({ message: "Vote recorded" });
  } catch (error) {
    console.error("Error recording vote:", error);
    return res.status(500).json({ error: "Error processing vote" });
  }
});

// Delete a vote (remove a user's vote)
router.delete('/', async (req, res) => {
  try {
    const { pollId, userId } = req.body;

    // Validate inputs
    if (!pollId || !userId) {
      return res.status(400).json({ error: "pollId and userId are required" });
    }

    // Find the poll
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    // Find the vote record for this poll and user
    const voteRecord = await Vote.findOne({ pollId, userId });
    if (!voteRecord) {
      return res.status(404).json({ error: "Vote not found" });
    }

    // Extract the optionId from the vote record
    const { optionId } = voteRecord;

    // Decrement the vote count for the corresponding option in the poll
    let optionFound = false;
    poll.options = poll.options.map(option => {
      if (option.id === optionId) {
        optionFound = true;
        return { ...option, votes: Math.max(0, option.votes - 1) };
      }
      return option;
    });
    if (!optionFound) {
      return res.status(400).json({ error: "Invalid optionId in vote record" });
    }
    await poll.save();

    // Remove the vote record
    await Vote.deleteOne({ _id: voteRecord._id });

    // Emit a real-time update via Socket.io
    const io = req.app.get('socketio');
    if (io) {
      io.to(pollId).emit('voteUpdate', { pollId, optionId });
    }

    return res.json({ message: "Vote removed successfully" });
  } catch (error) {
    console.error("Error removing vote:", error);
    return res.status(500).json({ error: "Error removing vote" });
  }
});


// Get a vote record for a user in a poll
router.get('/user', async (req, res) => {
  try {
    const { pollId, userId } = req.query;
    if (!pollId || !userId) {
      return res.status(400).json({ error: "pollId and userId are required" });
    }
    const voteRecord = await Vote.findOne({ pollId, userId });
    if (!voteRecord) {
      return res.status(404).json({ error: "Vote not found" });
    }
    return res.json(voteRecord);
  } catch (error) {
    console.error("Error fetching user vote:", error);
    return res.status(500).json({ error: "Error fetching vote" });
  }
});

export default router;
