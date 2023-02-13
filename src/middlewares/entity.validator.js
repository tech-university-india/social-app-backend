const joi = require('joi');

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
	imageURL: joi.array().items(joi.string().uri()),
	caption:joi.string(),
	meta : joi.object().keys({
		date : joi.date(),
		venue : joi.string()
	}),
	location: joi.array().items(joi.string())
});

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


const updateValidatior = (request, response, next) => {
	
	const {error1} =entitySchmea.validate({entityId: request.params.entityId});
	if(error1){
		response.status(400).json({message:error1.message});
	}

	const { error } = entityUpdatingSchema.validate(request.body);
	if (error) {
		return response.status(400).json({ message: error.message });
	}
	next();
};

module.exports = { singleEntityValidator, entitiesBySingleUserValidator, updateValidatior };
