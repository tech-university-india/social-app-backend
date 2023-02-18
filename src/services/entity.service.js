const { Entity, Action, User, Tag } = require('../models');
const HTTPError = require('../errors/httpError');
const { actionTypes, entityTypes } = require('../utils/constants');
const paginationUtil = require('../utils/pagination.util');

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
		attributes: ['id', 'type', 'caption', 'imageURL', 'meta', 'location', 'likeCount', 'commentCount', 'updatedAt'],
		include: [{
			model: User,
			attributes: ['FMNO', 'userName', 'designation', 'profilePictureURL']
		}, {
			model: Action,
			where: { type: actionTypes.LIKE, createdBy: userId },
			attributes: ['id'],
			required: false
		}, {
			model: Tag,
			attributes: ['taggedId'],
			include: {
				model: User,
				attributes: ['FMNO', 'userName', 'designation', 'profilePictureURL']
			}
		}],
	});
	if (!entity) throw new HTTPError(404, 'Entity not found');
	return entity;
};

const getCommentsByEntityId = async (entityId, options) => {
	const { pageTimeStamp, limit, offset, nextURL } = paginationUtil.paginate(options); 
	// console.log(pageTimeStamp, limit, offset);
	const comments = await Action.findAll({
		where: {
			type: actionTypes.COMMENT,
			entityId: entityId,
			updatedAt: { [sequelize.Op.lt]: pageTimeStamp }
		},
		attributes: ['meta', 'updatedAt'],
		include: {
			model: User,
			attributes: ['FMNO', 'userName', 'designation', 'profilePictureURL'],
			required: false,
		},
		order: [['updatedAt', 'DESC']],
		limit: limit, offset: offset
	});
	return { items: comments, meta: { next: comments.length < limit ? null : nextURL } };
};

/* This function is used to get all the entities of a single user from Entities table
 and also get the like and comments of the entity from Action table and construct the final
entity  JSON Object  return it.
 @param { integer } userId
 @param { string } type
*/
const getEntitiesBySingleUser = async (id, type, userId, options) => {
	const { pageTimeStamp, limit, offset, nextURL } = paginationUtil.paginate(options); 
	const entities = await Entity.findAll({
		where: { 
			createdBy: id, 
			type: type.toUpperCase(),
			updatedAt: { [sequelize.Op.lt]: pageTimeStamp }
		},
		attributes: ['id', 'type', 'caption', 'imageURL', 'meta', 'location', 'likeCount', 'commentCount', 'updatedAt'],
		include: [{
			model: User,
			attributes: ['FMNO', 'userName', 'designation', 'profilePictureURL']
		},
		{
			model: Action,
			where: { type: actionTypes.LIKE, createdBy: userId },
			attributes: ['id'],
			required: false
		}, {
			model: Tag,
			attributes: ['taggedId'],
			include: {
				model: User,
				attributes: ['FMNO', 'userName', 'designation', 'profilePictureURL'],
			},
			required: false
		}],
		order: [['updatedAt', 'DESC'], ['id', 'DESC']],
		limit: limit, offset: offset
	});
	return { items: entities, meta: { next: entities.length < limit ? null : nextURL } };
};

const getPostFeed = async (userId, options) => {
	//TODO: Better Logic on sequelize.literal 
	const { pageTimeStamp, limit, offset, nextURL } = paginationUtil.paginate(options); 
	const entities = await Entity.findAll({
		where: {
			type: entityTypes.POST,
			[sequelize.Op.or]: [{
				id: { [sequelize.Op.in]: sequelize.literal(`(SELECT "Tags"."entityId" FROM "Tags" WHERE "Tags"."taggedId" = ${userId})`) }
			}, {
				createdBy: { [sequelize.Op.in]: sequelize.literal(`(SELECT "Follows"."followingId" FROM "Follows" WHERE "Follows"."followerId" = ${userId})`) }
			}],
			updatedAt: { [sequelize.Op.lt]: pageTimeStamp }
		},
		attributes: ['id', 'type', 'caption', 'imageURL', 'meta', 'location', 'likeCount', 'commentCount', 'updatedAt'],
		include: [{
			model: User,
			attributes: ['FMNO', 'userName', 'designation', 'profilePictureURL']
		}, {
			model: Action,
			where: { type: actionTypes.LIKE, createdBy: userId },
			attributes: ['id'],
			required: false
		}],
		order: [['updatedAt', 'DESC'], ['id', 'DESC']],
		limit: limit, offset: offset
	});
	return { items: entities, meta: { next: entities.length < limit ? null : nextURL } };
};

const getAnnouncementFeed = async (userId, locations, startDate, endDate, options) => {
	// console.log(locations, startDate, endDate, )
	const { pageTimeStamp, limit, offset, nextURL } = paginationUtil.paginate(options);
	const whereQuery = {
		type: entityTypes.ANNOUNCEMENT,
		updatedAt: { [sequelize.Op.lt]: pageTimeStamp }
	};
	if(locations) whereQuery['location'] = { [sequelize.Op.overlap]: locations };
	if(startDate || endDate){
		whereQuery['meta'] = { date: {} };
		if(startDate) whereQuery['meta']['date'][sequelize.Op.gte] = new Date(Number(startDate));
		if(endDate) whereQuery['meta']['date'][sequelize.Op.lte] = new Date(Number(endDate));
	}
	const entities = await Entity.findAll({
		where: whereQuery,
		attributes: ['id', 'type', 'caption', 'imageURL', 'meta', 'location', 'likeCount', 'commentCount', 'updatedAt'],
		include: [{
			model: User,
			attributes: ['FMNO', 'userName', 'designation', 'profilePictureURL']
		}, {
			model: Action,
			where: { type: actionTypes.LIKE, createdBy: userId },
			attributes: ['id'],
			required: false
		}],
		order: [['updatedAt', 'DESC'], ['id', 'DESC']],
		limit: limit, offset: offset
	});
	return { items: entities, meta: { next: entities.length < limit ? null : nextURL } };
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



module.exports = { createEntity, getSingleEntityData, getCommentsByEntityId, getEntitiesBySingleUser, getPostFeed, getAnnouncementFeed, updateEntityService, deleteSingleEntity };
