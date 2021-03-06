import request from 'supertest';
import app, {PORT} from "@src/app";
import { connectDatabase } from '@helpers/Database.helper';
import { user } from '@helpers/Seed.helper';

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

describe('Test Login route', () => {

  it('should throw validation error > /auth/login', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({email: 'xxxxxx@mail.com', password: ''});

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch("email and password should be passed");
  });

  it('should throw wrong password email error > /auth/login', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({email: 'email@gmail.com', password: '12345'});
  
    expect(response.status).toBe(401);
    expect(response.body?.error).toMatch("email or password is not correct");
  });

  it('should login correctly > /auth/login', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({email: user.email, password: user.password});
  
    expect(response.status).toBe(200);
    expect(response.body?.success).toBe(true);
    expect(response.body).toHaveProperty('accessToken');
  });

});


afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});