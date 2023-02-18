'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Interests', [{
      interestName: "football",
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      interestName: "trekking",
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      interestName: "cricket",
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      interestName: "rock climbing",
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {

      interestName: "fishing",
      createdBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      interestName: "javascript",
      createdBy: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Interests', null, {});
  }
};
