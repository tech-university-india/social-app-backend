const entities = require('../controllers/entity.controllers');
const entityRouter = require('express').Router();
const entityValidator = require('../middlewares/entity.validator');

entityRouter.get('/:entityId', entityValidator.singleEntityValidator, entities.singleEntityRetiver);
entityRouter.get('/:type/:userId', entityValidator.entitiesBySingleUserValidator, entities.entitiesBySingleUserRetiver);
entityRouter.delete('/:entityId', entityValidator.singleEntityValidator, entities.singleEntityDeleter);

module.exports = entityRouter;