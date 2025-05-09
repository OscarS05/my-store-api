const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  up: (queryInterface) => {
    if(queryInterface.context){
      queryInterface = queryInterface.context
    }
    return queryInterface.bulkInsert(PRODUCT_TABLE, [
      {
        name: "New Product 1",
        price: 100,
        description: "A description",
        category_id: 1,
        image: "https://api.lorem.space/image/game?w=150&h=220",
        created_at: new Date(),
      },
      {
        name: "New Product 2",
        price: 200,
        description: "A description",
        category_id: 1,
        image: "https://api.lorem.space/image/game?w=150&h=220",
        created_at: new Date(),
      },
      {
        name: "New Product 3",
        price: 300,
        description: "A description",
        category_id: 2,
        image: "https://api.lorem.space/image/game?w=150&h=220",
        created_at: new Date(),
      },
      {
        name: "New Product 4",
        price: 400,
        description: "A description",
        category_id: 2,
        image: "https://api.lorem.space/image/game?w=150&h=220",
        created_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    if(queryInterface.context){
      queryInterface = queryInterface.context
    }
    return queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  },
};
