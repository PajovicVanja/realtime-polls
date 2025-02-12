// tests/polls.test.ts
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('Polls API', () => {
  let pollId: string;
  let token: string;

  before(() => {
    token = (global as any).testUserToken;
    if (!token) {
      throw new Error("Global token not set");
    }
    console.log('Using token:', token); 
  });

  it('should create a new poll', async () => {
    const pollData = {
      title: "What's your favorite test color?",
      options: [
        { id: "1", text: "Red", votes: 0 },
        { id: "2", text: "Blue", votes: 0 }
      ],
      expirationTime: new Date(Date.now() + 1000000).toISOString()
    };

    const res = await request(app)
      .post('/polls')
      .set('Authorization', `Bearer ${token}`)
      .send(pollData)
      .expect(201);

    expect(res.body).to.have.property('_id');
    pollId = res.body._id;
    (global as any).testPollId = pollId;
  });

  it('should retrieve the poll by ID', async () => {
    if (!pollId) throw new Error('pollId is undefined');
    const res = await request(app)
      .get(`/polls/${pollId}`)
      .expect(200);

    expect(res.body).to.have.property('title', "What's your favorite test color?");
  });

  it('should return poll status as active or expired', async () => {
    // Create an active poll (expiration in the future)
    const activePollData = {
      title: "Active Poll",
      options: [{ id: "1", text: "Yes", votes: 0 }],
      expirationTime: new Date(Date.now() + 3600000).toISOString() // 1 hour later
    };

    const activeRes = await request(app)
      .post('/polls')
      .set('Authorization', `Bearer ${token}`)
      .send(activePollData)
      .expect(201);
    const activePollId = activeRes.body._id;

    const statusResActive = await request(app)
      .get(`/polls/${activePollId}/status`)
      .expect(200);
    expect(statusResActive.body).to.have.property('status', 'active');

    // Create an expired poll (expiration in the past)
    const expiredPollData = {
      title: "Expired Poll",
      options: [{ id: "1", text: "Yes", votes: 0 }],
      expirationTime: new Date(Date.now() - 3600000).toISOString() 
    };

    const expiredRes = await request(app)
      .post('/polls')
      .set('Authorization', `Bearer ${token}`)
      .send(expiredPollData)
      .expect(201);
    const expiredPollId = expiredRes.body._id;

    const statusResExpired = await request(app)
      .get(`/polls/${expiredPollId}/status`)
      .expect(200);
    expect(statusResExpired.body).to.have.property('status', 'expired');
  });
});
