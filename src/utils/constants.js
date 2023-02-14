const actionTypes = Object.freeze({
	LIKE: 'LIKE',
	COMMENT:'COMMENT'
});

const entityTypes = Object.freeze({
	POST:'POST',
	ANNOUNCEMENT:'ANNOUNCEMENT'
});

module.exports = {
	actionTypes,
	entityTypes
};