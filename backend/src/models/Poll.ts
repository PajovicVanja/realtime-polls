// src/models/Poll.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for an Option
export interface IOption {
  id: string;
  text: string;
  votes: number;
}

// Define an interface for a Poll
export interface IPoll extends Document {
  title: string;
  options: IOption[];
  expirationTime: Date;
  createdAt: Date;
}

// Define the schema for poll options
const OptionSchema: Schema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

// Define the Poll schema
const PollSchema: Schema = new Schema({
  title: { type: String, required: true },
  options: { type: [OptionSchema], required: true },
  expirationTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPoll>('Poll', PollSchema);
