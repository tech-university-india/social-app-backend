'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Auths', {
      FMNO: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'FMNO'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      passwordHash: {
        allowNull: false,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Auths');
  }
};