'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Interests', [{
			interestName: "football",
      createdAt: new Date(),
      updatedAt: new Date(),
		},
    {
			interestName: "trekking",
      createdAt: new Date(),
      updatedAt: new Date(),
		},
    {
			interestName: "cricket",
      createdAt: new Date(),
      updatedAt: new Date(),
		},
    {
			interestName: "rock climbing",
      createdAt: new Date(),
      updatedAt: new Date(),
		},
    {

			interestName: "fishing",
      createdAt: new Date(),
      updatedAt: new Date(),
		},
    {
			interestName: "javascript",
      createdAt: new Date(),
      updatedAt: new Date(),
		}]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Interests', null, {});
  }
};
