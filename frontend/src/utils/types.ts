// src/utils/types.ts

export interface Option {
    id: string;
    text: string;
    votes: number;
  }
  
  export interface Poll {
    _id: string;
    title: string;
    options: Option[];
    expirationTime: string; 
    createdAt: string;
    updatedAt?: string;
 
    creator?: string;
  }
  
  export interface Vote {
    _id: string;
    pollId: string;
    optionId: string;
    userId?: string; 
    createdAt: string;
  }
  
  export interface User {
    _id: string;
    username: string;
    email: string;
  }
  
  export interface Comment {
    _id: string;
    pollId: string;
    text: string;
    userId: string | { _id: string; username: string };
    createdAt: string;
  }
  