// tests/comments.test.ts
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import Poll from '../src/models/Poll';
import Comment from '../src/models/Comment';

describe('Comments API', () => {
  let pollId: string;
  let commentId: string;
  let token: string;

  before(async () => {
    token = (global as any).testUserToken;
    if (!token) {
      throw new Error("Global token not set");
    }

    const pollData = {
      title: "Test Poll for Comments",
      options: [
        { id: "1", text: "Option 1", votes: 0 },
        { id: "2", text: "Option 2", votes: 0 }
      ],
      expirationTime: new Date(Date.now() + 1000000).toISOString()
    };

    const pollRes = await request(app)
      .post('/polls')
      .set('Authorization', `Bearer ${token}`)
      .send(pollData)
      .expect(201);

    pollId = pollRes.body._id;
    (global as any).testPollId = pollId;
  });

  it('should create a new comment for a poll', async () => {
    const commentData = {
      text: "This is a test comment"
    };

    const res = await request(app)
      .post(`/comments/${pollId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentData)
      .expect(201);

    expect(res.body).to.have.property('_id');
    commentId = res.body._id;
  });

  it('should retrieve all comments for the poll', async () => {
    const res = await request(app)
      .get(`/comments/${pollId}`)
      .expect(200);

    expect(res.body).to.be.an('array');
    expect(res.body.some((comment: any) => comment._id === commentId)).to.be.true;
  });
});
