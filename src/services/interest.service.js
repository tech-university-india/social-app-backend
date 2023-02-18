const { Interest } = require('../models');
const paginationUtil = require('../utils/pagination.util');

const sequelize = require('sequelize');

const getInterestsByName = async (interestName, options) => {
	const { pageTimeStamp, limit, offset, nextURL } = paginationUtil.paginate(options); 
	const whereQuery = {
		updatedAt: { [sequelize.Op.lt]: pageTimeStamp }
	};
	if(interestName) whereQuery.interestName = { [sequelize.Op.iLike]: `${interestName}%` };
	const interests = await Interest.findAll({
		where: whereQuery,
		attributes: ['id', 'interestName'],
		order: [['interestName', 'ASC']],
		limit: limit, offset: offset
	});
	return { items: interests, meta: { next: interests.length < limit ? null : nextURL } };
};


const postInterest = async (interestName, userId) => {
	return await Interest.create({ interestName: interestName.trim().toLowerCase(), createdBy: userId });
};

module.exports = { getInterestsByName, postInterest };