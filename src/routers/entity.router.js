const entityController = require('../controllers/entity.controller');
const entityRouter = require('express').Router();
const entityValidator = require('../middlewares/entity.validator');


entityRouter.post('/entity', entityValidator.createEntityValidator, entityController.createEntity);

entityRouter.get('/:entityId', entityValidator.singleEntityValidator, entityController.singleEntityRetiver);


entityRouter.get('/:type/:userId', entityValidator.entitiesBySingleUserValidator, entityController.entitiesBySingleUserRetiver);

entityRouter.delete('/:entityId', entityValidator.singleEntityValidator, entityController.singleEntityDeleter);


entityRouter.put('/:entityId', entityValidator.updateValidatior, entityController.updateEntity);


module.exports = entityRouter;
