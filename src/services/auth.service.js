const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const HTTPError = require('../errors/httperror');
const { User } = require('../models');

const register = async (user) => {
	const userExists = await User.findOne({ where: { email: user.email } });
	if (userExists) throw new HTTPError(400, 'User already exists');
	user.passwordHash = await bcrypt.hash(user.password, 10);
	const createdUser = await User.create(user);
	return JWT.sign({ id: createdUser.FMNO }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const login = async (email, password) => {
	const user = await User.findOne({ where: { email } });
	if (!user) throw new HTTPError(404, 'User not found');
	const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
	if (!isPasswordCorrect) throw new HTTPError(400, 'Invalid credentials');
	return JWT.sign({ id: user.FMNO }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = { register, login };
