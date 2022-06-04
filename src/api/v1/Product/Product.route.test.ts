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

let accessToken: string | undefined;

describe('Test Product route', () => {

  it('should login correctly > /auth/login', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({email: user.email, password: user.password});
  
    expect(response.status).toBe(200);
    expect(response.body?.success).toBe(true);
    expect(response.body).toHaveProperty('accessToken');

    accessToken = response.body.accessToken;
  });


  it('should send authorization error (status 401) > /product/discount/1', async () => {
    const response = await request(app)
      .post('/api/v1/product/discount/1');
  
    expect(response.status).toBe(401);
    expect(response.body?.success).toBe(false);
    expect(response.body.error).toMatch('Authentication Error:');

  });


  it('should send authorization error (status 401) > /product/discount/1', async () => {
    const response = await request(app)
      .get('/api/v1/product/discount/1');
  
    expect(response.status).toBe(401);
    expect(response.body?.success).toBe(false);
    expect(response.body.error).toMatch('Authentication Error:');
  });


  it('should get product is not found error & pass route authentication > /product/discount/0', async () => {
    const response = await request(app)
      .get('/api/v1/product/discount/0')
      .set('Authorization', `Bearer ${accessToken}`);
  
    expect(response.status).toBe(500);
    expect(response.body?.success).toBe(false);
    expect(response.body.error).toMatch('Product is not found');
  });

  it('should get 5% discount on product 1 > /product/discount/1', async () => {
    const response = await request(app)
      .get('/api/v1/product/discount/1')
      .set('Authorization', `Bearer ${accessToken}`);
  
    expect(response.status).toBe(200);
    expect(response.text).toEqual('5');
  });

  it('should get 10% discount on product 2 > /product/discount/2', async () => {
    const response = await request(app)
      .get('/api/v1/product/discount/2')
      .set('Authorization', `Bearer ${accessToken}`);
  
    expect(response.status).toBe(200);
    expect(response.text).toEqual('10');
  });

  it('should get 7% discount on product 3 > /product/discount/3', async () => {
    const response = await request(app)
      .get('/api/v1/product/discount/3')
      .set('Authorization', `Bearer ${accessToken}`);
  
    expect(response.status).toBe(200);
    expect(response.text).toEqual('7');
  });

  it('should get -1% discount on product 4 > /product/discount/4', async () => {
    const response = await request(app)
      .get('/api/v1/product/discount/4')
      .set('Authorization', `Bearer ${accessToken}`);
  
    expect(response.status).toBe(200);
    expect(response.text).toEqual('-1');
  });


});


afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});