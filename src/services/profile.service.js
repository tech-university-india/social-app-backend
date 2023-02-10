const { User } = require('../models');
const HTTPError = require('../errors/httperror');

const getUserById = async (id) => {
  // const user = await User.findOne({ where: { FMNO: id } });
  const user = await User.findByPk(id);
  if(!user) throw new HTTPError(404, 'User not found');
  return user;
};

module.exports = { getUserById };