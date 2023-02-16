const entityController = require('../controllers/entity.controller');
const entityRouter = require('express').Router();
const entityValidator = require('../middlewares/entity.validator');


entityRouter.post('/', entityValidator.createEntityValidator, entityController.createEntity);

entityRouter.get('/:entityId', entityValidator.singleEntityValidator, entityController.getSingleEntityData);

entityRouter.get('/:entityId/comments', entityValidator.singleEntityValidator, entityController.getCommentsByEntityId);

entityRouter.get('/:type/feed', entityValidator.entityFeedValidator, entityController.getFeed);

entityRouter.get('/:type/:userId', entityValidator.entitiesBySingleUserValidator, entityController.getEntitiesBySingleUser);

entityRouter.delete('/:entityId', entityValidator.singleEntityValidator, entityController.deleteSingleEntity);

entityRouter.put('/:entityId', entityValidator.updateValidatior, entityController.updateEntity);


module.exports = entityRouter;
