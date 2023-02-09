const { Entity, Action, User } = require('../models');
const customHTTPError = require('../errors/httpError');
const utils = require('../utils/entity.utils');

/* This function is used to get single entity data from Entities table
 and also get the user data from User table and also get the like 
 and comments of the entity from Action table and construct the final
entity  JSON Onbject  return it.
 @param { integer } entityId 
*/




const getSingleEntityData = async (entityId) => {
	// Get the entity data from Entity table
	const entity = await Entity.findOne({
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
		where: {
			id: entityId
		}
	});
	if (!entity) throw new customHTTPError(404, 'Entity not found');
	// Get the user data from User table
	const userData = await User.findAll({
		attributes: ['userName', 'designation', 'profilePictureURL'],
		where: {
			FMNO: entity.createdBy
		}
	});
	// Get the like count and comments of the entity from Action table
	const likeCountOfSingleEntity = await Action.findAndCountAll({
		where: {
			type: 'LIKE',
			entityId: entityId
		}
	});
	const entityComments = await Action.findAndCountAll({
		attributes: ['meta'],
		where: {
			type: 'COMMENT',
			entityId: entityId
		},
		include: [{
			model: User,
			attributes: ['userName', 'designation', 'profilePictureURL'] //This will tell the SQL query to include the user data with the comment data 
		}]
	});
	const finalEntityData = utils.constructEntity(entity, userData, likeCountOfSingleEntity, entityComments);
	return finalEntityData;
};

module.exports = { getSingleEntityData };