const profileRouter = require('express').Router();

const profileController = require('../controllers/profile.controller');
const profileValidator = require('../middlewares/profile.validator');

profileRouter.get('/:userId', profileValidator.getProfileByIdValidator, profileController.getUserById);
//console.log("Naman");
profileRouter.post('/follow', profileController.followUser);
module.exports = profileRouter;