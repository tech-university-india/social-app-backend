const { Action, Entity } = require('../models');
const HTTPError = require('../errors/httpError');
const { actionTypes } = require('../utils/constants');

const postAction = async (type, entityId, userId, meta) => {
	//TODO: Better Logic to prevent duplicate Likes
	const createdAction = await Action.create({
		type: type,
		entityId: entityId,
		createdBy: userId,
		meta: meta
	});
	type === actionTypes.LIKE ? await Entity.increment('likeCount', { where: { id: entityId } }) : await Entity.increment('commentCount', { where: { id: entityId } });
	return createdAction;
};

const deleteAction = async (actionId, userId) => {
	//TODO: Better Logic Action Deletion
	const action = await Action.findOne({ where: { id: actionId }, atributes: ['id', 'type', 'entityId', 'createdBy'] });
	if (!action) throw new HTTPError(404, 'Action not found');
	if (action.createdBy !== userId) throw new HTTPError(403, 'Unauthorized to delete this action');
	if (action.type === actionTypes.LIKE){
		// await Promise.all([
		//     Entity.decrement('likeCount', { where: { id: action.entityId } }),
		//     Action.destroy({ where: { entityId: action.entityId, type: actionTypes.LIKE, createdBy: action.createdBy } })
		// ]);
		const deletedLikes = await Action.destroy({ where: { entityId: action.entityId, type: actionTypes.LIKE, createdBy: action.createdBy } });
		await Entity.decrement('likeCount', { by: deletedLikes, where: { id: action.entityId } });
	} else if(action.type === actionTypes.COMMENT) {
		await Promise.all([
			Entity.decrement('commentCount', { where: { id: action.id } }),
			Action.destroy({ where: { id: actionId } })
		]);
	} else {
		throw new HTTPError(400, 'Invalid Action Type');
	}
	// const deletedActionCount = await Action.destroy({
	//     where: {
	//         id: actionId,
	//         createdBy: userId
	//     }
	// });
	return true;
};

module.exports = { postAction, deleteAction };