const joi = require('joi');


/* This Schema used to verify entity ID which is 
given through path

*/
const entitySchmea = joi.object({
	entityId: joi.number().integer().required(),
});


const singleEntityValidator = (request, response, next) => {
	const { error } = entitySchmea.validate({ entityId: request.params.entityId });
	if (error) {
		return response.status(400).json({ message: error.message });
	}
	next();
};
module.exports = { singleEntityValidator };
