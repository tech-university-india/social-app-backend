const actionController = require('../controllers/action.controller');
const actionValidator = require('../middlewares/action.validator');

const actionRouter = require('express').Router();

actionRouter.post('/', actionValidator.postActionValidator, actionController.postAction);
actionRouter.delete('/:actionId', actionValidator.deleteActionValidator, actionController.deleteAction);

module.exports = actionRouter;