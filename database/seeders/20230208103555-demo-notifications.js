'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Notifications', [{
      destinationURL: 'https://example1.com',
      meta: JSON.stringify({
        text: 'This is a test notification1',
      }),
      createdBy: 2,
      createdAt: new Date()
    },
    {
      destinationURL: 'https://example2.com',
      meta: JSON.stringify({
        text: 'This is a test notification2',
      }),
      createdBy: 3,
      createdAt: new Date()
    },
    {
      destinationURL: 'https://example3.com',
      meta: JSON.stringify({
        text: 'This is a test notification3',
      }),
      createdBy: 5,
      createdAt: new Date()
    },
    {
      destinationURL: 'https://example4.com',
      meta: JSON.stringify({
        text: 'This is a test notification4',
      }),
      createdBy: 5,
      createdAt: new Date()
    },
    {
      destinationURL: 'https://example5.com',
      meta: JSON.stringify({
        text: 'This is a test notification5',
      }),
      createdBy: 2,
      createdAt: new Date()
    },
    {
      destinationURL: 'https://example6.com',
      meta: JSON.stringify({
        text: 'This is a test notification6',
      }),
      createdBy: 2,
      createdAt: new Date()
    },
    {
      destinationURL: 'https://example7.com',
      meta: JSON.stringify({
        text: 'This is a test notification7',
      }),
      createdBy: 5,
      createdAt: new Date()
    },
    {
      destinationURL: 'https://example8.com',
      meta: JSON.stringify({
        text: 'This is a test notification8',
      }),
      createdBy: 3,
      createdAt: new Date()
    },
    {
      destinationURL: 'https://example9.com',
      meta: JSON.stringify({
        text: 'This is a test notification9',
      }),
      createdBy: 4,
      createdAt: new Date()
    },
    {
      destinationURL: 'https://example10.com',
      meta: JSON.stringify({
        text: 'This is a test notification10',
      }),
      createdBy: 3,
      createdAt: new Date()
    },
    {
      destinationURL: 'https://example11.com',
      meta: JSON.stringify({
        text: 'This is a test notification11',
      }),
      createdBy: 5,
      createdAt: new Date()
    },
    {
      destinationURL: 'https://example12.com',
      meta: JSON.stringify({
        text: 'This is a test notification12',
      }),
      createdBy: 5,
      createdAt: new Date()
    },
    {
      destinationURL: 'https://example.com13',
      meta: JSON.stringify({
        text: 'This is a test notification13',
      }),
      createdBy: 4,
      createdAt: new Date()
    }]
  )},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Notifications', null, {});
  }
};
