'use strict';

const { entityTypes } = require('../../src/Utils/Constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Entities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM(entityTypes.POST, entityTypes.ANNOUNCEMENT)
      },
      caption: {
        type: Sequelize.TEXT
      },
      imageURL: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      meta: {
        type: Sequelize.JSONB
      },
      location: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'FMNO'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Entities');
  }
};