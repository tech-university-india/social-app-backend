const { User } = require('../models');

const getUser = async (id) => {
	return await User.findOne({ where: { FMNO: id } });
};

module.exports = { getUser };