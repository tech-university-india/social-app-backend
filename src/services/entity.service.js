const { Entity, Action, User } = require('../models');
const customHTTPError = require('../errors/httpError');
const { actionTypes } = require('../utils/constants');

const sequelize = require('sequelize');


const createPost = async (type, caption, imageURL, meta, location, createdBy) => {
	const newPost = {
		type,
		caption,
		imageURL,
		meta: {
			date: meta.date,
			venue: meta.venue
		},
		location,
		createdBy
	};
  
	const createPostResponseFromDB = await  Entity.create(newPost);
	if(!createPostResponseFromDB ) throw new customHTTPError(400, 'Error while creating post');
	return createPostResponseFromDB;
};

/* This function is used to get single entity data from Entities table
 and also get the user data from User table and also get the like 
 and comments of the entity from Action table and construct the final
entity  JSON Object  return it.
 @param { integer } entityId 
*/

const getSingleEntityData = async (entityId) => {
	const entity = await Entity.findOne({
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
		where: {
			id: entityId
		},
		include: [{
			model: User,
			attributes: ['userName', 'designation', 'profilePictureURL']
		},
		{
			model: Action,
			attributes: [[sequelize.literal('(SELECT COUNT("Actions"."id"))'), 'LikesCount']],
			where: {
				type: actionTypes.LIKE
			},
			required: false
		},
		{
			model: Action,
			attributes: ['meta', [sequelize.literal('(SELECT COUNT("Actions"."id"))'), 'CommentsCount']],
			where: {
				type: actionTypes.COMMENT
			},
			require: false
		}
		],
		group: ['"Entity"."id"', '"Actions"."id"', '"User"."FMNO"']
	});
	if (!entity) throw new customHTTPError(404, 'Entity not found');
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
	if (!entities) throw new customHTTPError(404, 'No entities found');

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
	if (updatedResponseFromDB[0] === 0) throw new customHTTPError(404, 'Entity not found');

	return updatedResponseFromDB;

};

const deleteSingleEntity = async (entityId) => {
	const entity = await Entity.destroy({
		where: {
			id: entityId
		}
	});
	if (!entity) throw new customHTTPError(404, 'Entity not found');
	return true;
};

  

module.exports = { getSingleEntityData, getEntitiesBySingleUser, updateEntityService, deleteSingleEntity, createPost };
