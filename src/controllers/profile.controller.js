const profileService = require('../services/profile.service');

const getUserById = async (req, res) => {
	console.log('Hii');
	res.send(await profileService.getUser(req.params.userId));
};

module.exports = { getUserById };