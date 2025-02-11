// tests/votes.test.ts
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('Votes API', () => {
  let pollId: string;
  let userId: string;
  let token: string;

  before(async () => {
    token = (global as any).testUserToken;
    pollId = (global as any).testPollId;
    userId = (global as any).testUserId;
    if (!pollId) {
      throw new Error("testPollId is not set");
    }
  });

  it('should cast a vote on a poll', async () => {
    const voteData = {
      pollId: pollId,
      optionId: "1",
      userId: userId
    };

    const res = await request(app)
      .post('/votes')
      .set('Authorization', `Bearer ${token}`)
      .send(voteData)
      .expect(200);

    expect(res.body).to.have.property('message', 'Vote recorded');
  });
});
