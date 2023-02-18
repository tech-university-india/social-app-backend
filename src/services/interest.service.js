const { Interest } = require('../models');

const sequelize = require('sequelize');

const getInterestsByName = async (interestName, options) => {
	const whereQuery = {};
	if(interestName) whereQuery.interestName = { [sequelize.Op.iLike]: `${interestName}%` };
	const interests = await Interest.findAll({
		where: whereQuery,
		attributes: ['id', 'interestName'],
		order: [['interestName', 'ASC']],
	});
	return { items: interests, meta: { next: null } };
};


const postInterest = async (interestName, userId) => {
	return await Interest.create({ interestName: interestName.trim().toLowerCase(), createdBy: userId });
};

module.exports = { getInterestsByName, postInterest };