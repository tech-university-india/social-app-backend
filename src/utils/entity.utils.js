const constructEntity = (entity, userData, likeCountOfSingleEntity, entityComments) => {
	let finalEntityData = {};
	finalEntityData = {
		id: entity.id,
		userName: userData.userName,
		caption: entity.caption,
		userId: entity.createdBy,
		location: entity.location,
		designation: userData.designation,
		profilePictureURL: userData.profilePictureURL,
		likseCount: likeCountOfSingleEntity.count,
		commentCount: entityComments.count,
		comments: entityComments.rows
	};
	if (entity.type === 'ANNOUNCEMENT') {
		finalEntityData['venue'] = entity.meta.venue;
		finalEntityData['time'] = entity.meta.date;
	}

	return finalEntityData;
};
module.exports = { constructEntity };