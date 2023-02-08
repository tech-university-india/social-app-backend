const profileRouter = require('express').Router();

const profileController = require('../controllers/profile.controller');

profileRouter.get('/:userId', profileController.getUserById);

module.exports = profileRouter;