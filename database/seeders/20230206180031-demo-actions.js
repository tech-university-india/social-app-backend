'use strict';

const { actionTypes } = require('../../src/Utils/Constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Actions', [{
      type: actionTypes.LIKE,
      entityId: 2,
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.COMMENT,
      entityId: 2,
      meta: JSON.stringify({ commentText: "comment1" }),
      createdBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.COMMENT,
      entityId: 3,
      meta: JSON.stringify({ commentText: "comment2" }),
      createdBy: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.LIKE,
      entityId: 4,
      createdBy: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.COMMENT,
      entityId: 5,
      meta: JSON.stringify({ commentText: "comment3" }),
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.LIKE,
      entityId: 6,
      createdBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.COMMENT,
      entityId: 7,
      meta: JSON.stringify({ commentText: "comment4" }),
      createdBy: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.LIKE,
      entityId: 8,
      createdBy: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.COMMENT,
      entityId: 9,
      meta: JSON.stringify({ commentText: "comment5" }),
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.LIKE,
      entityId: 10,
      createdBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.LIKE,
      entityId: 11,
      createdBy: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.COMMENT,
      entityId: 12,
      meta: JSON.stringify({ commentText: "comment6" }),
      createdBy: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.COMMENT,
      entityId: 13,
      meta: JSON.stringify({ commentText: "comment7" }),
      createdBy: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.LIKE,
      entityId: 14,
      createdBy: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.COMMENT,
      entityId: 15,
      meta: JSON.stringify({ commentText: "comment8" }),
      createdBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.LIKE,
      entityId: 16,
      createdBy: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.COMMENT,
      entityId: 17,
      meta: JSON.stringify({ commentText: "comment9" }),
      createdBy: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.LIKE,
      entityId: 18,
      createdBy: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.COMMENT,
      entityId: 19,
      meta: JSON.stringify({ commentText: "comment10" }),
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: actionTypes.LIKE,
      entityId: 20,
      createdBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Actions', null, {});
  }
};
