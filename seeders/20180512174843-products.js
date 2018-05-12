'use strict';

var seeds = require('./product_seeds.json');

module.exports = {
  // for adding
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Products', seeds, {});
    
  },
  // for deleting
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
