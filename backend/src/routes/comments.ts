// src/routes/comments.ts
import { Router } from 'express';
import Comment from '../models/Comment';
import { verifyToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Create a comment for a poll (protected)
router.post('/:pollId', verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { pollId } = req.params;
    const { text } = req.body;
    const userId = req.user?.id;
    const newComment = new Comment({
      pollId,
      text,
      userId,
    });
    const comment = await newComment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
});

// Retrieve all comments for a poll (public) with populated user details
router.get('/:pollId', async (req, res) => {
  try {
    const { pollId } = req.params;
    const comments = await Comment.find({ pollId }).populate('userId', 'username');
    res.json(comments);
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).json({ error: "Error retrieving comments" });
  }
});

export default router;
