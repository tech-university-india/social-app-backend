const profileRouter = require('express').Router();

const profileController = require('../controllers/profile.controller');
const profileValidator = require('../middlewares/profile.validator');

profileRouter.get('/:userId', profileValidator.getProfileByIdValidator, profileController.getUserById);
profileRouter.get('/:userId/followers',  profileController.getFollowersById);
profileRouter.get('/:userId/following', profileController.getFollowingById);
profileRouter.delete('/unfollow/:userId', profileController.unfollowById);

module.exports = profileRouter;