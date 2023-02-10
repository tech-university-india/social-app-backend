const entityService = require('../services/entity.services');
const customHTTPError = require('../errors/httpError');

/*
This function acts as controller to retiver single user data
from databse where it's paramters are:
@param {Object} request
@params {Object} response

*/
const singleEntityRetiver = async (request, response) => {
	try {
		const entityId = request.params.entityId;
		const entityData = await entityService.getSingleEntityData(entityId);
		response.status(200).json({ message: 'Entity data fetched successfully', entityData });
	} catch (error) {
		if (error instanceof customHTTPError) {
			return response.status(error.statusCode).json({ message: error.message });
		} else {
			return response.status(500).json({ message: error.message });
		}

	}
};

const entitiesBySingleUserRetiver = async (request, response) => {
	try {
		const userId = request.params.userId;
		const type = request.params.type;
		const entityData = await entityService.getEntitiesBySingleUser(userId, type);
		response.status(200).json({ message: 'Entity data fetched successfully', entityData });
	} catch (error) {
		if (error instanceof customHTTPError) {
			return response.status(error.statusCode).json({ message: error.message });
		} else {
			return response.status(500).json({ message: error.message });
		}
	}
};

const singleEntityDeleter = async (request, response) => {
	try {
		const entityId = request.params.entityId;
		await entityService.deleteSingleEntity(entityId);
		response.status(200).json({ message: 'Entity data deleted successfully' });
	} catch (error) {
		if (error instanceof customHTTPError) {
			return response.status(error.statusCode).json({ message: error.message });
		} else {
			return response.status(500).json({ message: error.message });
		}
	}
};


module.exports = { singleEntityRetiver , entitiesBySingleUserRetiver , singleEntityDeleter };