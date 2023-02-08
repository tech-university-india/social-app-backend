'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'johndoe@mckinsey.com',
      passwordHash: 'password',
      userName: 'John Doe',
      designation: 'Partner',
      email: 'example@example.com',
      profilePictureURL: 'https://example.com/image.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
