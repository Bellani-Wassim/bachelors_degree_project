const request = require('supertest');
const app = require('../server');


beforeAll(async () => {
  await app.startDatabase();
});


describe('GET /api', () => {
  test('GET /api/fournisseur', async () => {
    const response = await request(app).get('/api/fournisseur');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch('application/json');
  });
  
  test('GET /api/technicien', async () => {
    const response = await request(app).get('/api/technicien');
    
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch('application/json');
  });

  test('GET /api/equipement', async () => {
    const response = await request(app).get('/api/equipement');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch('application/json');
  });

  test('GET /api/plateforme', async () => {
    const response = await request(app).get('/api/plateforme');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch('application/json');
  });

  test('GET /api/contrat', async () => {
    const response = await request(app).get('/api/contrat');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch('application/json');
  });

  test('GET /api/ticket', async () => {
    const response = await request(app).get('/api/ticket');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch('application/json');
  });
});    
