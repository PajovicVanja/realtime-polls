// src/components/CommentForm.tsx
import React, { useState } from 'react';
import { postComment } from '../services/commentService';

interface CommentFormProps {
  pollId: string;
  onCommentPosted: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ pollId, onCommentPosted }) => {
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Comment cannot be empty.');
      return;
    }
    try {
      await postComment(pollId, text);
      setText('');
      setError(null);
      onCommentPosted();
    } catch (err) {
      setError('Failed to post comment.Please log in or sign up');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;
