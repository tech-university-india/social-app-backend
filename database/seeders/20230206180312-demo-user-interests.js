'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserInterests', [{
      userId: 1,
      interestId: 1,
      createdAt: new Date(),
    },
    {
      userId: 2,
      interestId: 1,
      createdAt: new Date(),
    },
    {
      userId: 3,
      interestId: 1,
      createdAt: new Date(),
    },
    {
      userId: 4,
      interestId: 1,
      createdAt: new Date(),
    },
    {
      userId: 5,
      interestId: 1,
      createdAt: new Date(),
    },
    {
      userId: 3,
      interestId: 2,
      createdAt: new Date(),
    },
    {
      userId: 1,
      interestId: 3,
      createdAt: new Date(),
    },
    {
      userId: 4,
      interestId: 4,
      createdAt: new Date(),
    },
    {
      userId: 2,
      interestId: 5,
      createdAt: new Date(),
    },
    {
      userId: 5,
      interestId: 4,
      createdAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserInterests', null, {});
  }
};
