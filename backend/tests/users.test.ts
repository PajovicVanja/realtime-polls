// tests/users.test.ts
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('Users API', () => {
  if (!(global as any).testUserToken) {
    let userId: string;
    let token: string;
    let userEmail: string;
    const password = "password123";

    it('should sign up a new user', async () => {
      const uniqueSuffix = Date.now();
      const userData = {
        username: `testuser_${uniqueSuffix}`,
        email: `testuser_${uniqueSuffix}@example.com`,
        password: password
      };

      const res = await request(app)
        .post('/users/signup')
        .send(userData)
        .expect(201);

      expect(res.body).to.have.property('_id');
      userId = res.body._id;
      userEmail = userData.email;

      (global as any).testUserId = userId;
      (global as any).testUserEmail = userEmail;
    });

    it('should log in the user and return a token', async () => {
      const loginData = {
        email: (global as any).testUserEmail, 
        password: password
      };

      const res = await request(app)
        .post('/users/login')
        .send(loginData)
        .expect(200);

      expect(res.body).to.have.property('token');
      token = res.body.token;
      (global as any).testUserToken = token;
    });
  } else {
    console.log("Global testUserToken already set; skipping Users API tests.");
  }
});
