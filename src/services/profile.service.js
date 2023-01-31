const { User } = require('../models');

const getUser = async (id) => {
	return await User.findOne({ where: { id: id } });
};

module.exports = { getUser };