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
		comments: entityComments.rows,
		type: entity.type,
		imageURL: entity.imageURL
	};
	if (entity.type === 'ANNOUNCEMENT') {
		finalEntityData['venue'] = entity.meta.venue;
		finalEntityData['time'] = entity.meta.date;
	}

	return finalEntityData;
};

const constructEntitiesForSingleUser = (entities, numberLikesOfEntities, numberCommentsOfEntities) => {
	let finalEntitiesData = [];
	for (let idx = 0; idx < entities.length; idx++) {
		let finalEntityData = {};
		finalEntityData = {
			id: entities[idx].id,
			caption: entities[idx].caption,
			userId: entities[idx].createdBy,
			location: entities[idx].location,
			likseCount: numberLikesOfEntities[idx].count,
			commentCount: numberCommentsOfEntities[idx].count,
			imageURL: entities[idx].imageURL
		};
		if (entities[idx].type === 'ANNOUNCEMENT') {
			finalEntityData['venue'] = entities[idx].meta.venue;
			finalEntityData['time'] = entities[idx].meta.date;
		}
		finalEntitiesData.push(finalEntityData);
	}
	return finalEntitiesData;
};

module.exports = { constructEntity, constructEntitiesForSingleUser };