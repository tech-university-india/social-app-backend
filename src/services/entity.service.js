const { Entity, Action, User, Tag } = require('../models');
const HTTPError = require('../errors/httpError');
const { actionTypes } = require('../utils/constants');

const sequelize = require('sequelize');


const createEntity = async (entityBody, userId) => {
	const newEntity = {
		type: entityBody.type,
		caption: entityBody.caption,
		imageURL: entityBody.imageURL,
		meta: entityBody.meta,
		location: entityBody.location,
		createdBy: userId
	};
	const createdEntity = await Entity.create(newEntity);
	const tags = await Tag.bulkCreate(entityBody.tags.map(tag => ({ taggedId: tag.id, entityId: createdEntity.id })));
	return { entity: createdEntity, tags: tags };
};

/* This function is used to get single entity data from Entities table
 and also get the user data from User table and also get the like 
 and comments of the entity from Action table and construct the final
entity  JSON Object  return it.
 @param { integer } entityId 
*/
const getSingleEntityData = async (entityId, userId) => {
	const entity = await Entity.findOne({
		where: { id: entityId },
		attributes: ['id', 'type', 'caption', 'imageURL', 'meta', 'location', 'likeCount', 'commentCount', [sequelize.literal('(SELECT COUNT("Actions"."id"))'), 'isLiked']],
		include: [{
			model: User,
			attributes: ['FMNO', 'userName', 'designation', 'profilePictureURL']
		}, {
			model: Action,
			where: { type: actionTypes.LIKE, createdBy: userId },
			attributes: [],
			required: false
		}, {
			model: Tag,
			attributes: ['taggedId'],
			include: {
				model: User,
				attributes: ['FMNO', 'userName', 'designation', 'profilePictureURL']
			}
		}],
		group: ['"Entity"."id"', '"User"."FMNO"', '"Tags"."id"', '"Tags->User"."FMNO"']
	});
	if (!entity) throw new HTTPError(404, 'Entity not found');
	return entity;
};

const getCommentsByEntityId = async (entityId) => {
	return await Action.findAll({
		where: {
			type: actionTypes.COMMENT,
			entityId: entityId
		},
		attributes: ['meta'],
		include: {
			model: User,
			attributes: ['FMNO', 'userName', 'designation', 'profilePictureURL'],
			required: false,
		}
	});
};

/* This function is used to get all the entities of a single user from Entities table
 and also get the like and comments of the entity from Action table and construct the final
entity  JSON Object  return it.
 @param { integer } userId
 @param { string } type
*/
const getEntitiesBySingleUser = async (id, type, userId) => {
	const entities = await Entity.findAll({
		where: { createdBy: id, type: type.toUpperCase() },
		attributes: ['id', 'type', 'caption', 'imageURL', 'meta', 'location', 'likeCount', 'commentCount', [sequelize.literal('(SELECT COUNT("Actions"."id"))'), 'isLiked']],
		include: [{
			model: User,
			attributes: ['FMNO', 'userName', 'designation', 'profilePictureURL']
		}, 
		{
			model: Action,
			where: { type: actionTypes.LIKE, createdBy: userId },
			attributes: [],
			required: false
		}, {
			model: Tag,
			attributes: ['taggedId'],
			include: {
				model: User,
				attributes: ['FMNO', 'userName', 'designation', 'profilePictureURL']
			}
		}],
		group: ['"Entity"."id"', '"User"."FMNO"', '"Tags"."id"', '"Tags->User"."FMNO"'],
		order: [['updatedAt', 'DESC'], ['id', 'DESC']]
	});
	return entities;
};

/*
This function is used to update the entity data in the database
@param {object} response
@param {object} request
*/
const updateEntityService = async (requestedEntityUpdateData, entityId, userId) => {
	//TODO: Better Logic and Error Handling for checking the user is the owner of the entity
	const updatedResponseFromDB = await Entity.update({
		caption: requestedEntityUpdateData.caption,
		meta: requestedEntityUpdateData.meta,
		imageURL: requestedEntityUpdateData.imageURL,
		location: requestedEntityUpdateData.location
	}, {
		where: {
			id: entityId,
			createdBy: userId
		},
		returning: true
	});
	if (updatedResponseFromDB[0] === 0) throw new HTTPError(404, 'Entity not found');
	await Tag.destroy({ where: { entityId: entityId } });
	const createdTags = await Tag.bulkCreate(requestedEntityUpdateData.tags.map(tag => ({ taggedId: tag.id, entityId: entityId })));
	return { entity: updatedResponseFromDB[1], tags: createdTags };
};

const deleteSingleEntity = async (entityId, userId) => {
	//TODO: Better Logic and Error Handling for checking the user is the owner of the entity
	const isDeleted = await Entity.destroy({
		where: {
			id: entityId,
			createdBy: userId
		}
	});
	if (isDeleted === 0) throw new HTTPError(404, 'Entity not found');
	return true;
};

  

module.exports = { getSingleEntityData, getCommentsByEntityId, getEntitiesBySingleUser, updateEntityService, deleteSingleEntity, createEntity };
