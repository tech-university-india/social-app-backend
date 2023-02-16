const profileRouter = require('express').Router();

const profileController = require('../controllers/profile.controller');
const profileValidator = require('../middlewares/profile.validator');


profileRouter.get('/:userId', profileValidator.getByUserIdValidator, profileController.getUserById);
profileRouter.get('/:userId/followers', profileValidator.getByUserIdValidator, profileController.getFollowersById);
profileRouter.get('/:userId/following', profileValidator.getByUserIdValidator, profileController.getFollowingById);
profileRouter.delete('/unfollow/:userId', profileValidator.deleteByUserIdValidator, profileController.unfollowById);
profileRouter.post('/follow', profileController.followUser);
profileRouter.put('/', profileValidator.updateProfileValidator, profileController.updateProfile);

module.exports = profileRouter;