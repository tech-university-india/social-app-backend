const {Interest} = require('../models');
const HTTPError = require('../errors/httperror');

const postInterest = async (body) => {
	body.interestName = body.interestName.toLowerCase();
	const interest = await Interest.create(body);

	if(!interest) throw new HTTPError(501, 'Invalid Data');
	return interest;

};

module.exports = {postInterest};