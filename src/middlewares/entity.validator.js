const Joi = require('joi');

const { entityTypes } = require('../../src/utils/constants');

/* This Schema used to verify entity ID which is 
given through path

*/
const entitySchmea = Joi.object({
	entityId: Joi.number().integer().required(),
});

const entityForUserIDSchema = Joi.object({
	userId: Joi.string().required(),
	type: Joi.string().required()
});


const entityUpdatingSchema = Joi.object({
	entityId: Joi.number().integer().required(),
	imageURL: Joi.array().items(Joi.string().uri()),
	caption: Joi.string(),
	meta: Joi.object().keys({
		date: Joi.date(),
		venue: Joi.string()
	}),
	location: Joi.array().items(Joi.string()),
	tags: Joi.array().items(Joi.object({
		id: Joi.number().integer().required(),
	})),
});

const createEntitySchema = Joi.object({
	type: Joi.string().valid(entityTypes.ANNOUNCEMENT, entityTypes.POST).required(),
	caption: Joi.string(),
	imageURL: Joi.array().items(Joi.string()),
	meta: Joi.object().keys({
		date: Joi.string(),
		venue: Joi.string()
	}),
	location: Joi.array().items(Joi.string()),
	tags: Joi.array().items(Joi.object({
		id: Joi.number().integer().required(),
	})),
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
