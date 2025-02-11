// tests/00-setup.ts
import request from 'supertest';
import app from '../src/app';

before(async () => {
  const uniqueSuffix = Date.now();
  const userData = {
    username: `testuser_${uniqueSuffix}`,
    email: `testuser_${uniqueSuffix}@example.com`,
    password: "password123"
  };

  // Sign up the new user
  await request(app)
    .post('/users/signup')
    .send(userData)
    .expect(201);

  // Log in the user
  const res = await request(app)
    .post('/users/login')
    .send({ email: userData.email, password: userData.password })
    .expect(200);

  console.log("Test user token:", res.body.token); // Should print a valid JWT
  (global as any).testUserToken = res.body.token;
  (global as any).testUserId = res.body.user._id;
});
