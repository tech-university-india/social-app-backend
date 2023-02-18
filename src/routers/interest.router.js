const interestRouter = require('express').Router();

const interestController = require('../controllers/interest.controller');
const interestValidator = require('../middlewares/interest.validator');

interestRouter.get('/', interestValidator.getInterestByNameValidator, interestController.getInterestsByName);
interestRouter.post('/', interestValidator.postInterestValidator, interestController.postInterest);

module.exports = interestRouter;