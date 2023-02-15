const joi = require('joi');

const { entityTypes } = require('../../src/utils/constants');

/* This Schema used to verify entity ID which is 
given through path

*/
const entitySchmea = joi.object({
	entityId: joi.number().integer().required(),
});

const entityForUserIDSchema = joi.object({
	userId: joi.string().required(),
	type: joi.string().required()
});


const entityUpdatingSchema = joi.object({
	entityId: joi.number().integer().required(),
	imageURL: joi.array().items(joi.string().uri()),
	caption: joi.string(),
	meta: joi.object().keys({
		date: joi.date(),
		venue: joi.string()
	}),
	location: joi.array().items(joi.string())
});

const createEntitySchema = joi.object({
	type: joi.string().valid(entityTypes.ANNOUNCEMENT, entityTypes.POST).required(),
	caption: joi.string(),
	imageURL: joi.array().items(joi.string()),
	meta: {
		date: joi.string(),
		venue: joi.string()
	},
	location: joi.array().items(joi.string()),
});
  
const createEntityValidator = (req, res, next) => {
	const { error } = createEntitySchema.validate(req.body);
  
	if (error) {
		res.status(400).json({ message: error.message });
		return;
	}
	next();
};

const singleEntityValidator = (request, response, next) => {
	const { error } = entitySchmea.validate({ entityId: request.params.entityId });
	if (error) {
		return response.status(400).json({ message: error.message });
	}
	next();
};

const entitiesBySingleUserValidator = (request, response, next) => {
	const { error } = entityForUserIDSchema.validate({ userId: request.params.userId, type: request.params.type });
	if (error) {
		return response.status(400).json({ message: error.message });
	}
	request.params.type = request.params.type.toUpperCase();
	next();
};


const updateValidatior = (request, response,next) => {
	request.body.entityId=request.params.entityId;
	const { error } = entityUpdatingSchema.validate(request.body);
	if (error) {
		return response.status(400).json({ message: error.message });
	}
	next();
};

module.exports = { singleEntityValidator, entitiesBySingleUserValidator, updateValidatior, createEntityValidator };
