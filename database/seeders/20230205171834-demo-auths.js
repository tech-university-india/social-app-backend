'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Auths', [{
			FMNO:1,
			email: 'exampleuser1@example.com',
			passwordHash: "$2b$10$RQXb8MGSeQgmLmDH/xoxU.659Yy8mG0KA0jAFpOevLXKekIGjvfZ6",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			FMNO:2,
			email: 'exampleuser2@example.com',
			passwordHash: "$2b$10$RQXb8MGSeQgmLmDH/xoxU.659Yy8mG0KA0jAFpOevLXKekIGjvfZ6",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			FMNO:3,
      		email: 'exampleuser3@example.com',
	  		passwordHash: "$2b$10$RQXb8MGSeQgmLmDH/xoxU.659Yy8mG0KA0jAFpOevLXKekIGjvfZ6",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			FMNO:4,
			email: 'exampleuser4@example.com',
			passwordHash: "$2b$10$RQXb8MGSeQgmLmDH/xoxU.659Yy8mG0KA0jAFpOevLXKekIGjvfZ6",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			FMNO:5,
			email: 'exampleuser5@example.com',
			passwordHash: "$2b$10$RQXb8MGSeQgmLmDH/xoxU.659Yy8mG0KA0jAFpOevLXKekIGjvfZ6",
			createdAt: new Date(),
			updatedAt: new Date(),
		}]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Auths', null, {});
  }
};
