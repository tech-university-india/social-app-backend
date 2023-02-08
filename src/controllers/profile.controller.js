const profileService = require('../services/profile.service');

const getUserById = async (req, res) => {
	console.log('Hii');
	const user = await profileService.getUser(req.params.userId);
	// console.log(user)
	res.status(200).json(user);
};

module.exports = { getUserById };