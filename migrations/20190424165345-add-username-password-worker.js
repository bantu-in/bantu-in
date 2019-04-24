'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return Promise.all([
       queryInterface.addColumn('Workers', 'username', { type: Sequelize.STRING }),
       queryInterface.addColumn('Workers', 'password', { type: Sequelize.STRING }),
       queryInterface.addColumn('Providers', 'username', { type: Sequelize.STRING }),
       queryInterface.addColumn('Providers', 'password', { type: Sequelize.STRING })
      ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return Promise.all([
    queryInterface.removeColumn('Workers', 'username'),
    queryInterface.removeColumn('Workers', 'password'),
    queryInterface.removeColumn('Providers', 'username'),
    queryInterface.removeColumn('Providers', 'password')
   ])
  }
};
