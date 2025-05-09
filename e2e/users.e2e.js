const request = require('supertest');

const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('tests for /users path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);

    await upSeed();
  });

  describe('GET /users/{id}', () => {
    test('Should return a user', async () => {
      const user = await models.User.findByPk('1');

      const { statusCode, body } = await api.get(`/api/v1/users/${user.id}`);
      expect(statusCode).toEqual(200);
      expect(body.id).toEqual(user.id);
      expect(body.email).toEqual(user.email);
    });
  });

  describe('POST /users', () => {
    test('Should return a 400 bad request with email invalid', async () => {
      //Arrange
      const inputData = {
        email: "oscar@email.com",
        password: "-----"
      };

      // Act
      const { statusCode, body } = await api.post('/api/v1/users').send(inputData);

      // Assert
      expect(statusCode).toEqual(400);
      expect(body.message).toMatch(/password/);
    });

    test('Should return a 400 bad request with password invalid', async () => {
      const inputData = {
        email: "----------",
        password: "Passw0rd@"
      };

      const { statusCode, body } = await api.post('/api/v1/users').send(inputData);
      expect(statusCode).toEqual(400);
      expect(body.message).toMatch(/email/);
    });

    test('Should return a new user', async () => {
      const inputData = {
        email: "juanita@email.com",
        password: "Passw0rd@"
      };

      const { statusCode, body } = await api.post('/api/v1/users').send(inputData);
      expect(statusCode).toEqual(201);

      // Check db
      const user = await models.User.findByPk(body.id);
      expect(user).toBeTruthy();
      expect(user.role).toEqual('admin');
      expect(user.email).toEqual(inputData.email);
    });
  });

  describe('PATCH /users', () => {

  });

  describe('DELETE /users', () => {

  });

  afterAll(async () => {
    await downSeed();
    server.close(); //Cerrar el servidor es una buena práctica
  });
});
