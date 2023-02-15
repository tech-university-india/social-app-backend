const profileRouter = require('express').Router();

const profileController = require('../controllers/profile.controller');
const profileValidator = require('../middlewares/profile.validator');

profileRouter.get('/:userId', profileValidator.getProfileByIdValidator, profileController.getUserById);
profileRouter.post('/follow',profileController.followUser);
profileRouter.put('/', profileController.updateProfile);
module.exports = profileRouter;