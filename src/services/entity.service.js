const { Entity, Action, User } = require('../models');
const HTTPError = require('../errors/httpError');
const { actionTypes } = require('../utils/constants');

const sequelize = require('sequelize');
// const { group } = require('console');


const createEntity = async (entityBody, userId) => {
	const newEntity = {
		...entityBody,
		createdBy: userId
	};
	return await Entity.create(newEntity);
};

/* This function is used to get single entity data from Entities table
 and also get the user data from User table and also get the like 
 and comments of the entity from Action table and construct the final
entity  JSON Object  return it.
 @param { integer } entityId 
*/

const getSingleEntityData = async (entityId, userId) => {
	// const entity = await Entity.findOne({
	// 	attributes: ['id', 'type', 'caption', 'imageURL', 'meta', 'location', ],
	// 	// [sequelize.literal(`(SELECT COUNT("Actions"."id") FROM "Actions" WHERE "Actions"."type" = 'LIKE' AND "Entity"."id" = ${entityId})`), 'LikeCount'], [sequelize.literal(`(SELECT COUNT("Actions"."id") FROM "Actions" WHERE "Actions"."type" = 'COMMENT' AND "Entity"."id" = ${entityId})`), 'commentCount']],
	// 	where: {
	// 		id: entityId
	// 	},
	// 	include: [{
	// 		model: User,
	// 		attributes: ['userName', 'designation', 'profilePictureURL']
	// 	},
	// 	{
	// 		model: Action,
	// 		attributes: [[sequelize.literal('(SELECT COUNT("Actions"."id"))'), 'LikesCount']],
	// 		where: {
	// 			type: actionTypes.LIKE
	// 		},
	// 		required: false
	// 	},
	// 	{
	// 		model: Action,
	// 		attributes: ['meta', [sequelize.literal('(SELECT COUNT("Actions"."id"))'), 'CommentsCount']],
	// 		// attributes: ['meta'],
	// 		where: {
	// 			type: actionTypes.COMMENT
	// 		},
	// 		require: false
	// 	}],
	// 	group: ['"Entity"."id"', '"Actions"."id"', '"User"."FMNO"']
	// });
	// const entity = await Entity.findOne({
	// 	where: { id: entityId },
	// 	include: [{
	// 		model: User,
	// 		attributes: ['userName', 'designation', 'profilePictureURL']
	// 	}, {
	// 		model: Action,
	// 		attributes: ["type", [sequelize.literal('(SELECT COUNT("Actions"."type"))'), 'count']],
	// 		group: ["type"],
	// 		required: false
	// 	}],
	// 	group: ['"Entity"."id"', '"User"."FMNO"', '"Actions"."type"']
	// });
	const entity = await Entity.findOne({
		where: { id: entityId },
		attributes: ['id', 'type', 'caption', 'imageURL', 'meta', 'location', ],
		include: [{
			model: User,
			attributes: ['userName', 'designation', 'profilePictureURL']
		}, {
			model: Action,
			attributes: ["type", [sequelize.literal(`(SELECT COUNT("Actions"."type"))`), 'count']],
			group: ["type"],
			required: false,
		}],
		group: ['"Entity"."id"', '"User"."FMNO"', '"Actions"."type"']
	});
	if (!entity) throw new HTTPError(404, 'Entity not found');
	return entity;
};



/* This function is used to get all the entities of a single user from Entities table
 and also get the like and comments of the entity from Action table and construct the final
entity  JSON Object  return it.
 @param { integer } userId
 @param { string } type
*/

const getEntitiesBySingleUser = async (userId, type) => {
	const entities = await Entity.findAll({
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
		include: [{
			model: Action,
			attributes: [[sequelize.literal('(SELECT COUNT("Actions"."id"))'), 'LikesCount']],
			where: {
				type: actionTypes.LIKE
			},
			required: false
		},
		{
			model: Action,
			attributes: [[sequelize.literal('(SELECT COUNT("Actions"."id"))'), 'CommentsCount']],
			where: {
				type: actionTypes.COMMENT
			},
			required: false
		}

		],

		where: {
			createdBy: userId,
			type: type.toUpperCase()
		},
		group: ['"Entity"."id"', '"Actions"."id"']
	});
	return entities;
};

/*
This function is used to update the entity data in the database
@param {object} response
@param {object} request
*/

const updateEntityService = async (requestedEntityUpdateData, entityId) => {

	const updatedResponseFromDB = await Entity.update({
		caption: requestedEntityUpdateData.caption,
		meta: requestedEntityUpdateData.meta,
		imageURL: requestedEntityUpdateData.imageURL,
		location: requestedEntityUpdateData.location
	}, {
		where: {
			id: entityId
		}
	}
	);
	if (updatedResponseFromDB[0] === 0) throw new HTTPError(404, 'Entity not found');
	return updatedResponseFromDB;

};

const deleteSingleEntity = async (entityId) => {
	const entity = await Entity.destroy({
		where: {
			id: entityId
		}
	});
	if (!entity) throw new HTTPError(404, 'Entity not found');
	return true;
};

  

module.exports = { getSingleEntityData, getEntitiesBySingleUser, updateEntityService, deleteSingleEntity, createEntity };
