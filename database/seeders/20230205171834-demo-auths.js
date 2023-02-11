'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Auths', [{
			FMNO:1,
			email: 'exampleuser1@example.com',
			passwordHash: "$2b$10$XCUoMdZaMl3.SiydyNYykODH/hmiuRp0c5IsiWTsIwbPdlA.Yv6bO",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			FMNO:2,
			email: 'exampleuser2@example.com',
			passwordHash: "$2b$10$XCUoMdZaMl3.SiydyNYykODH/hmiuRp0c5IsiWTsIwbPdlA.Yv6bO",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			FMNO:3,
      email: 'exampleuser3@example.com',
			passwordHash: "$2b$10$XCUoMdZaMl3.SiydyNYykODH/hmiuRp0c5IsiWTsIwbPdlA.Yv6bO",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			FMNO:4,
			email: 'exampleuser4@example.com',
			passwordHash: "$2b$10$XCUoMdZaMl3.SiydyNYykODH/hmiuRp0c5IsiWTsIwbPdlA.Yv6bO",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			FMNO:5,
			email: 'exampleuser5@example.com',
			passwordHash: "$2b$10$XCUoMdZaMl3.SiydyNYykODH/hmiuRp0c5IsiWTsIwbPdlA.Yv6bO",
			createdAt: new Date(),
			updatedAt: new Date(),
		}]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Auths', null, {});
  }
};
