const bcrypt = require('bcrypt');

const { USER_TABLE } = require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    if(queryInterface.context){
      queryInterface = queryInterface.context
    }

    const hash = (password) => bcrypt.hash(password, 10);

    return queryInterface.bulkInsert(USER_TABLE, [
      {
        email: 'admin@mail.com',
        password: await hash('admin123'),
        role: 'admin',
        created_at: new Date(),
      },
      {
        email: 'customer@mail.com',
        password: await hash('customer123'),
        role: 'customer',
        created_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    if(queryInterface.context){
      queryInterface = queryInterface.context
    }
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  },
};
