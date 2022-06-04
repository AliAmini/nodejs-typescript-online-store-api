import request from 'supertest';
import app, {PORT} from "@src/app";
import { connectDatabase } from '@helpers/Database.helper';

let mongoose: any, server: any;

beforeAll(async () => {
  /**
   * Server & Database Activation
   */

  mongoose = await connectDatabase();
  await new Promise((resolve, reject) => {
    server = app.listen(PORT, () => {
      console.log(`\nServer is listening on port ${PORT}\n`);
      resolve(1);
    });
  })
});

describe('Test all Auth routes', () => {

  it('should throw validation error > /auth/login', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({email: 'xxxxxx@mail.com', password: ''});

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch("email and password should be passed");
    console.log('response.body', response.status, response.body);
  });
});

it('should throw validation error > /auth/login', async () => {
  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({email: 'xxxxxx@mail.com', password: ''});

  expect(response.status).toBe(401);
  expect(response.body).toHaveProperty('error');
  expect(response.body.error).toMatch("email and password should be passed");
  console.log('response.body', response.status, response.body);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});