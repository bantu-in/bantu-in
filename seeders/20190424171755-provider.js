'use strict';
const fs = require('fs')
let provider = JSON.parse(fs.readFileSync("./mock-data/provider-data.json", 'utf8'))
let worker = JSON.parse(fs.readFileSync("./mock-data/worker-data.json", 'utf8'))
let post = JSON.parse(fs.readFileSync("./mock-data/post-data.json", 'utf8'))


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        provider.forEach(data => {
          data.createdAt = new Date(data.createdAt)
          data.updatedAt = new Date(data.updatedAt)
        });
        worker.forEach(data => {
          data.createdAt = new Date(data.createdAt)
          data.updatedAt = new Date(data.updatedAt)
        });
        post.forEach(data => {
          data.createdAt = new Date(data.createdAt)
          data.updatedAt = new Date(data.updatedAt)
        });
        return Promise.all( [
          queryInterface.bulkInsert('Providers', provider, {}),
          queryInterface.bulkInsert('Posts', post, {}),
          queryInterface.bulkInsert('Workers', worker, {}),
      ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return Promise.all( [
        queryInterface.bulkDelete('Providers', provider, {}),
        queryInterface.bulkDelete('Posts', post, {}),
        queryInterface.bulkDelete('Workers', worker, {}),
    ])
  }
};
