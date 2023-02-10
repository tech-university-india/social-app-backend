const { entityValidator } = require('../middlewares/entities.validator');
const { entityController } = require('../controllers/entities.controller');

const entityRouter = require('express').Router();

entityRouter.post('/entity', entityValidator, entityController);
// entityRouter.post('/entity', entityController);

module.exports = { entityRouter };
