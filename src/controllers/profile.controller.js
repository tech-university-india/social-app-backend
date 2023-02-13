const profileService = require('../services/profile.service');
const HTTPError = require('../errors/httperror');

const getUserById = async (req, res) => {
	try {
		const user = await profileService.getUserById(req.params.userId);
		// console.log(req.user);
		res.status(200).json(user);
	} catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};

const followUser = async (req, res) => {
	try {
		//console.log(req.user, req.body.userId);
		const user = await profileService.followUser(Number(req.user.id), Number(req.body.userId));
		//console.log(req.user);
		res.status(201).json(user);
	} catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(400).json({ message: err.message });
	}
};

module.exports = { getUserById, followUser };