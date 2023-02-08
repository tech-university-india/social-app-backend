'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Tags', [{
			entityId: 2,
			taggedId: 1,
			createdAt: new Date(),
		},
		{
			entityId: 2,
			taggedId: 2,
			createdAt: new Date(),
		},
		{
			entityId: 3,
			taggedId: 2,
			createdAt: new Date(),
		},
		{
			entityId: 3,
			taggedId: 3,
			createdAt: new Date(),
		},
		{
			entityId: 5,
			taggedId: 3,
			createdAt: new Date(),
		},
		{
			entityId: 5,
			taggedId: 3,
			createdAt: new Date(),
		},
		{
			entityId: 6,
			taggedId: 4,
			createdAt: new Date(),
		},
		{
			entityId: 6,
			taggedId: 4,
			createdAt: new Date(),
		},
		{
			entityId: 14,
			taggedId: 4,
			createdAt: new Date(),
		},
		{
			entityId: 14,
			taggedId: 2,
			createdAt: new Date(),
		},
		{
			entityId: 6,
			taggedId: 2,
			createdAt: new Date(),
		},
		{
			entityId: 3,
			taggedId: 5,
			createdAt: new Date(),
		},
		{
			entityId: 6,
			taggedId: 5,
			createdAt: new Date(),
		},
		{
			entityId: 4,
			taggedId: 5,
			createdAt: new Date(),
		},
		{
			entityId: 20,
			taggedId: 4,
			createdAt: new Date(),
		}]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Tags', null, {});
	}
};
