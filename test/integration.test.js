import request from 'supertest';
import app from '../server.js';

let server;

beforeAll(() => {
  server = app.listen(0); // Use port 0 for random available port
});

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
});

describe('Data Ingestion API', () => {
  it('should handle ingestion and return correct status', async () => {
    const res = await request(app)
      .post('/ingest')
      .send({ ids: [1, 2, 3, 4, 5], priority: 'HIGH' });

    expect(res.statusCode).toBe(200);
    expect(res.body.ingestion_id).toBeDefined();

    const status = await request(app)
      .get(`/status/${res.body.ingestion_id}`);

    expect(status.body.ingestion_id).toBe(res.body.ingestion_id);
    expect(status.body.batches.length).toBeGreaterThan(0);
  });
});
