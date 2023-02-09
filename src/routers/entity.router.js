const entities = require('../controllers/entity.controllers');
const entityRouter = require('express').Router();
const entityValidator = require('../middlewares/entity.validator');

entityRouter.get('/:entityId', entityValidator.singleEntityValidator, entities.singleEntityRetiver);

module.exports = entityRouter;