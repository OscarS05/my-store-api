const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('../../src/db/sequelize');

const umzug = new Umzug({
  migrations: { glob: './src/db/seeders/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined,
});

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true }); //Create tables without migrations
    await umzug.up();
  } catch (error) {
    console.error(error);
  }
}

const downSeed = async () => {
  await sequelize.drop();
}

module.exports = {
  upSeed,
  downSeed,

};
