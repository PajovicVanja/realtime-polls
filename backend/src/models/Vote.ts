// src/models/Vote.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IVote extends Document {
  pollId: mongoose.Types.ObjectId;
  optionId: string;
  userId?: mongoose.Types.ObjectId; // Optional for anonymous voting
  createdAt: Date;
}

const VoteSchema: Schema = new Schema({
  pollId: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
  optionId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IVote>('Vote', VoteSchema);
