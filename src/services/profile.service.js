const { User } = require('../models');
const HTTPError = require('../errors/httperror');

const getUser = async (id) => {
	const user = await User.findOne({ where: { FMNO: id } });
	if(!user) throw new HTTPError(404, 'User not found');
	return user;
};

module.exports = { getUser };