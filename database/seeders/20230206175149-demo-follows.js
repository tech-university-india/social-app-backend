'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Follows', [{
      followerId: 2,
      followingId: 1,
      createdAt: new Date(),
      },
      {
      followerId: 2,
      followingId: 4,
      createdAt: new Date(),
      },
      {
      followerId: 3,
      followingId: 2,
      createdAt: new Date(),
      },
      {
      followerId: 5,
      followingId: 3,
      createdAt: new Date(),
      },
      {
      followerId: 1,
      followingId: 5,
      createdAt: new Date(),
      },
      {
      followerId: 3,
      followingId: 1,
      createdAt: new Date(),
      },
      {
      followerId: 3,
      followingId: 4,
      createdAt: new Date(),
      },
      {
      followerId: 5,
      followingId: 2,
      createdAt: new Date(),
      },
      {
      followerId: 2,
      followingId: 5,
      createdAt: new Date(),
      },
      {
      followerId: 1,
      followingId: 2,
      createdAt: new Date(),
      },
      {
      followerId: 5,
      followingId: 1,
      createdAt: new Date(),
      },
      {
      followerId: 2,
      followingId: 3,
      createdAt: new Date(),
      },
      {
      followerId: 3,
      followingId: 5,
      createdAt: new Date(),
      },
      {
      followerId: 1,
      followingId: 3,
      createdAt: new Date(),
      }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Follows', null, {});
  }
};
