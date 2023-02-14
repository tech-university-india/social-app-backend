const profileRouter = require('express').Router();

const profileController = require('../controllers/profile.controller');
const profileValidator = require('../middlewares/profile.validator');

profileRouter.get('/:userId', profileValidator.getByUserValidator, profileController.getUserById);
profileRouter.get('/:userId/followers',profileValidator.getByUserValidator,  profileController.getFollowersById);
profileRouter.get('/:userId/following',profileValidator.getByUserValidator, profileController.getFollowingById);

module.exports = profileRouter;