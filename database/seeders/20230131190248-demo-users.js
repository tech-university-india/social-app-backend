'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Users', [{
			FMNO: 1,
			email: 'exampleuser1@example.com',
			passwordHash: "pass@123",
			bio: "Backend and fishing expert",
			userName: 'John Doe',
			designation: 'Partner',
			profilePictureURL: 'https://example.com/image1.jpg',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			FMNO: 2,
			email: 'exampleuser3@example.com',
			passwordHash: "pass@123",
			bio: "backend developer and photography hobbyist",
			userName: 'Jane Doe',
			designation: 'Manager',
			profilePictureURL: 'https://example.com/image2.jpg',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			FMNO: 3,
			email: 'exampleuser4@example.com',
			passwordHash: "pass@123",
			bio: "full-stack developer and music lover",
			userName: 'Jim Smith',
			designation: 'Team Lead',
			profilePictureURL: 'https://example.com/image3.jpg',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			FMNO: 4,
			email: 'exampleuser5@example.com',
			passwordHash: "pass@123",
			bio: "data analyst and reading enthusiast",
			userName: 'Sarah Johnson',
			designation: 'Analyst',
			profilePictureURL: 'https://example.com/image4.jpg',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			FMNO: 5,
			email: 'exampleuser6@example.com',
			passwordHash: "pass@123",
			bio: "devops and gardening hobbyist",
			userName: 'Tom Brown',
			designation: 'Consultant',
			profilePictureURL: 'https://example.com/image5.jpg',
			createdAt: new Date(),
			updatedAt: new Date(),
		}]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
