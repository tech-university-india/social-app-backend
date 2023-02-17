const Joi = require('joi');

const { entityTypes } = require('../../src/utils/constants');

/* This Schema used to verify entity ID which is 
given through path

*/
const entitySchmea = Joi.object({
	params: Joi.object({
		entityId: Joi.number().integer().required(),
	}).required(),
	query: Joi.object({
		pageDate: Joi.date(),
		page: Joi.number().integer(),
		size: Joi.number().integer(),
	})
});

const entityForUserIDSchema = Joi.object({
	params: Joi.object({
		userId: Joi.string().required(),
		type: Joi.string().uppercase().valid(entityTypes.ANNOUNCEMENT, entityTypes.POST).required()
	}).required(),
	query: Joi.object({
		pageDate: Joi.date(),
		page: Joi.number().integer(),
		size: Joi.number().integer(),
	})
});

const entityFeedSchema = Joi.object({ 
	params: Joi.object({
		type: Joi.string().uppercase().valid(entityTypes.ANNOUNCEMENT, entityTypes.POST).required(),
	}).required(),
	query: Joi.object({
		locations: Joi.array().items(Joi.string()),
		startDate: Joi.date(),
		endDate: Joi.date(),
		pageDate: Joi.date(),
		page: Joi.number().integer(),
		size: Joi.number().integer(),
	})
})

const entityUpdatingSchema = Joi.object({
	params: Joi.object({
		entityId: Joi.number().integer().required(),
	}).required(),
	body: Joi.object({
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
	}).required(),
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
	const { error } = entitySchmea.validate({ params: request.params, query: request.query });
	if (error) {
		return response.status(400).json({ message: error.message });
	}
	next();
};

const entitiesBySingleUserValidator = (request, response, next) => {
	const { error } = entityForUserIDSchema.validate({ params: request.params, query: request.query });
	if (error) {
		return response.status(400).json({ message: error.message });
	}
	request.params.type = request.params.type.toUpperCase();
	next();
};

const entityFeedValidator = (request, response, next) => {
	const { error } = entityFeedSchema.validate({ params: request.params, query: request.query });
	if (error) return response.status(400).json({ message: error.message });
	request.params.type = request.params.type.toUpperCase();
	next();
};

const updateValidatior = (request, response,next) => {
	const { error } = entityUpdatingSchema.validate({ params: request.params, body: request.body });
	if (error) {
		return response.status(400).json({ message: error.message });
	}
	next();
};

module.exports = { singleEntityValidator, entitiesBySingleUserValidator, entityFeedValidator, updateValidatior, createEntityValidator };
