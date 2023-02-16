const profileController = require('../controllers/profile.controller');
const profileValidator = require('../middlewares/profile.validator');

const profileRouter = require('express').Router();

profileRouter.get('/:userId', profileValidator.getByUserIdValidator, profileController.getUserById);
profileRouter.get('/:userId/followers', profileValidator.getByUserIdValidator, profileController.getFollowersById);
profileRouter.get('/:userId/following', profileValidator.getByUserIdValidator, profileController.getFollowingById);
profileRouter.delete('/unfollow/:userId', profileValidator.deleteByUserIdValidator, profileController.unfollowById);

module.exports = profileRouter;