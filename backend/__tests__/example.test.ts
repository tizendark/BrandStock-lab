import request from 'supertest';
import app from '../src/app';

describe('Basic API Endpoints', () => {
  it('should have a health check endpoint', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should respond to the base path', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toContain('BrandStock');
  });

  it('should pass a simple sanity test', () => {
    expect(1 + 1).toBe(2);
  });
});
