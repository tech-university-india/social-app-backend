const entityService = require('../services/entity.service');
const HTTPError = require('../errors/httpError');
const { entityTypes } = require('../utils/constants');


const createEntity = async (req, res) => {
	try {
		const newPost = await entityService.createEntity(req.body, req.user.id);
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
const getSingleEntityData = async (request, response) => {
	try {
		const entityId = request.params.entityId;
		const entityData = await entityService.getSingleEntityData(entityId, request.user.id);
		response.status(200).json(entityData);
	} catch (error) {
		if (error instanceof HTTPError) {
			return response.status(error.statusCode).json({ message: error.message });
		} else {
			return response.status(500).json({ message: error.message });
		}

	}
};

const getCommentsByEntityId = async (request, response) => {
	try {
		const { pageDate = Date.now(), page = 1, size = 10 } = request.query;
		const options = {
			pageDate,
			page,
			size,
			path: `${request.baseUrl}${request.path}`,
			queryParams: request.query
		};
		const comments = await entityService.getCommentsByEntityId(request.params.entityId, options);
		response.status(200).json(comments);
	} catch (error) {
		if (error instanceof HTTPError) {
			return response.status(error.statusCode).json({ message: error.message });
		} else {
			return response.status(500).json({ message: error.message });
		}
	}
};

const getEntitiesBySingleUser = async (request, response) => {
	try {
		const { userId, type } = request.params;
		const { pageDate = Date.now(), page = 1, size = 10 } = request.query;
		const options = {
			pageDate,
			page,
			size,
			path: `${request.baseUrl}${request.path}`,
			queryParams: request.query
		};
		const entityData = await entityService.getEntitiesBySingleUser(userId, type, request.user.id, options);
		response.status(200).json(entityData);
	} catch (error) {
		if (error instanceof HTTPError) {
			return response.status(error.statusCode).json({ message: error.message });
		} else {
			return response.status(500).json({ message: error.message });
		}
	}
};

const getFeed = async (request, response) => {
	try {
		const { type } = request.params;
		const { locations, startDate, endDate, pageDate = Date.now(), page = 1, size = 10 } = request.query;
		const options = {
			pageDate,
			page,
			size,
			path: `${request.baseUrl}${request.path}`,
			queryParams: request.query
		};
		const feed = type === entityTypes.POST 
			? await entityService.getPostFeed(request.user.id, options) 
			: await entityService.getAnnouncementFeed(request.user.id, locations, startDate, endDate, options);
		response.status(200).json(feed);
	} catch (error) {
		if (error instanceof HTTPError) {
			return response.status(error.statusCode).json({ message: error.message });
		} else {
			return response.status(500).json({ message: error.message });
		}
	}
};

const deleteSingleEntity = async (request, response) => {
	try {
		await entityService.deleteSingleEntity(request.params.entityId, request.user.id);
		response.sendStatus(204);
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
		const updateResponse = await entityService.updateEntityService(request.body, request.params.entityId, request.user.id);
		response.status(201).json(updateResponse);

	} catch (error) {
		if (error instanceof HTTPError) {
			response.status(error.statusCode).json({ message: error.message });
		} else {
			response.status(500).json({ message: error.message });
		}
	}
};

module.exports = { createEntity, getSingleEntityData, getCommentsByEntityId, getEntitiesBySingleUser, getFeed, deleteSingleEntity, updateEntity };