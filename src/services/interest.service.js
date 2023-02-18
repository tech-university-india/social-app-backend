const { Interest } = require('../models');

const postInterest = async (interestName, userId) => {
	return await Interest.create({ interestName: interestName.trim().toLowerCase(), createdBy: userId });
};

module.exports = { postInterest };