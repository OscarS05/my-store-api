const request = require('supertest');

const createApp = require('../src/app');
const { config } = require('../src/config/config');

describe('tests for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
  });

  test('GET /hello', async () => {
    const response = await api.get('/hello');
    expect(response).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual('oscar');
    expect(response.headers['content-type']).toMatch(/json/);
  });

  describe('GET /nueva-ruta', () => {
    test('Should return 401', async () => {
      const { statusCode } = await api.get('/nueva-ruta');
      expect(statusCode).toEqual(401);
    });

    test('Should return 401 with invalid api key', async () => {
      const { statusCode } = await api.get('/nueva-ruta').set({ api: '1212' });
      expect(statusCode).toEqual(401);
    });

    test('Should return 200', async () => {
      const { statusCode } = await api.get('/nueva-ruta').set({ api: config.apiKey });
      expect(statusCode).toEqual(200);
    });
  });

  afterEach(() => {
    server.close(); //Cerrar el servidor es una buena práctica
  });
});
