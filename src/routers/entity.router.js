const entityController = require('../controllers/entity.controller');
const entityValidator = require('../middlewares/entity.validator');

const entityRouter = require('express').Router();

entityRouter.post('/', entityValidator.createEntityValidator, entityController.createEntity);
entityRouter.get('/:entityId', entityValidator.singleEntityValidator, entityController.getSingleEntityData);
entityRouter.get('/:entityId/comments', entityValidator.singleEntityValidator, entityController.getCommentsByEntityId);
entityRouter.get('/:type/feed', entityValidator.entityFeedValidator, entityController.getFeed);
entityRouter.get('/:type/:userId', entityValidator.entitiesBySingleUserValidator, entityController.getEntitiesBySingleUser);
entityRouter.put('/:entityId', entityValidator.updateValidatior, entityController.updateEntity);
entityRouter.delete('/:entityId', entityValidator.singleEntityValidator, entityController.deleteSingleEntity);

module.exports = entityRouter;
