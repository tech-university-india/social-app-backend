const entityService = require('../services/entity.service');
const HTTPError = require('../errors/httpError');


const createEntity = async (req, res) => {
	try {
		const { type, caption, imageURL, meta, location, createdBy } = req.body;
		const newPost = await entityService.createPost(type, caption, imageURL, meta, location, createdBy);
		res.status(201).json(newPost);
	}
  
	catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};


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
		if (error instanceof HTTPError) {
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
		if (error instanceof HTTPError) {
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
		if (error instanceof HTTPError) {
			return response.status(error.statusCode).json({ message: error.message });
		} else {
			return response.status(500).json({ message: error.message });
		}
	}
};


const updateEntity = async (request, response) => {
	try {
		const updateResponse = await entityService.updateEntityService(request.body, request.params.entityId);
		response.status(201).json({ message: 'Number of Rows update', entityDataUpdate: updateResponse[0] });

	} catch (error) {
		if (error instanceof HTTPError) {
			response.status(error.statusCode).json({ message: error.message });
		} else {
			response.status(500).json({ message: error.message });
		}
	}
};

module.exports = { singleEntityRetiver, entitiesBySingleUserRetiver, updateEntity, singleEntityDeleter ,createEntity };