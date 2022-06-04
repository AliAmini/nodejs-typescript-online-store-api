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

  it('should call /auth/login route', async () => {
    const response = await request(app)
      .get('/api/v1/auth/login');

    expect(response.status).toBe(404);
  });

});

afterAll(async () => {
  await mongoose.connection.close();
  // await connection.close();
  await server.close();
});