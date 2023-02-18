const authController = require('../controllers/auth.controller');
const authValidator = require('../middlewares/auth.validator');

const authRouter = require('express').Router();

authRouter.post('/register', authValidator.registerValidator, authController.register);
authRouter.post('/login', authValidator.loginValidator, authController.login);

module.exports = authRouter;