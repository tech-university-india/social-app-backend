const profileRouter = require('express').Router();

const { getUserById } = require('../controllers/profile.controller');

profileRouter.get('/profile/:userId', getUserById);

module.exports = profileRouter;