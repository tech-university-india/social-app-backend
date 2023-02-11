const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const HTTPError = require('../errors/httperror');
const { User, Auth } = require('../models');

const register = async (user) => {
	const userExists = await User.findOne({ where: { email: user.email } });
	if (userExists) throw new HTTPError(400, 'User already exists');
	user.passwordHash = await bcrypt.hash(user.password, 10);
	const userData = {
		FMNO: user.FMNO,
		userName: user.userName,
		bio: user.bio,
		designation: user.designation,
		profilePictureURL: user.profilePictureURL
	}
	const createdUser = await User.create(user);
	const userCredentials = {
		FMNO: createdUser.FMNO,
		email: user.email,
		passwordHash: user.passwordHash
	}
	const createdUserCredentials = await Auth.create(userCredentials);
	return JWT.sign({ id: createdUser.FMNO }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const login = async (email, password) => {
	const userCredentials = await Auth.findOne({ where: { email } });
	if (!userCredentials) throw new HTTPError(404, 'User not found');
	const isPasswordCorrect = await bcrypt.compare(password, userCredentials.passwordHash);
	if (!isPasswordCorrect) throw new HTTPError(400, 'Invalid credentials');
	return JWT.sign({ id: userCredentials.FMNO }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = { register, login };
