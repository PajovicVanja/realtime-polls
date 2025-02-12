// src/components/CommentSection.tsx
import React, { useEffect, useState } from 'react';
import { Comment } from '../utils/types';
import { getComments } from '../services/commentService';
import CommentForm from './CommentForm';

interface CommentSectionProps {
  pollId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ pollId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getComments(pollId);
      setComments(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch comments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [pollId]);

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {loading && <p>Loading comments...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && comments.length === 0 && <p>No comments yet.</p>}
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <small>
              By: {typeof comment.userId === 'object' ? comment.userId.username : comment.userId} on {new Date(comment.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
      <CommentForm pollId={pollId} onCommentPosted={fetchComments} />
    </div>
  );
};

export default CommentSection;
