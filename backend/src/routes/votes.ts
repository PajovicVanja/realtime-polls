import { Router } from 'express';
import Poll from '../models/Poll';
import Vote from '../models/Vote';

const router = Router();

// Cast a vote
router.post('/', async (req, res) => {
  try {
    const { pollId, optionId, userId } = req.body; // userId is optional for anonymous voting

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

    // (Optional) Emit a real-time update via Socket.io if needed.
    // For example: req.app.get('socketio').to(pollId).emit('voteUpdate', { pollId, optionId });

    return res.json({ message: "Vote recorded" });
  } catch (error) {
    console.error("Error recording vote:", error);
    return res.status(500).json({ error: "Error processing vote" });
  }
});

export default router;
