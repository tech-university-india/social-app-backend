const profileService = require('../services/profile.service');
const HTTPError = require('../errors/httperror');

const searchProfiles = async (req, res) => {
	try {
		const { userName, interestName, pageDate = Date.now(), page = 1, size = 10 } = req.query;
		const options = {
			pageDate,
			page,
			size,
			path: `${req.baseUrl}${req.path}`,
			queryParams: req.query
		};
		const users = await profileService.searchProfiles(req.user.id, userName, interestName, options);
		res.status(200).json(users);
	} catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};

const getUserById = async (req, res) => {
	try {
		const user = await profileService.getUserById(req.params.userId, req.user.id);
		// console.log(req.user);
		res.status(200).json(user);
	} catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};

const updateProfile = async (req, res) => {
	try {
		const user = await profileService.updateProfile(req.user.id, req.body);
		res.status(200).json(user);
	} catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};

const followUser = async (req, res) => {
	try {
		const user = await profileService.followUser(Number(req.user.id), Number(req.body.userId));
		res.status(201).json(user);
	} catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};

const getFollowersById = async (req, res) => {
	try {
		const followers = await profileService.getFollowersById(Number(req.params.userId), Number(req.user.id));
		res.status(200).json(followers);
	}
	catch (error) {
		if (error instanceof HTTPError) return res.status(error.statusCode).json({ message: error.message });
		res.status(500).json({ message: error.message });
	}
};

const getFollowingById = async (req, res) => {
	try {
		const followers = await profileService.getFollowingById(Number(req.params.userId), Number(req.user.id));
		res.status(200).json(followers);
	}
	catch (error) {
		if (error instanceof HTTPError) return res.status(error.statusCode).json({ message: error.message });
		res.status(500).json({ message: error.message });
	}
};

const unfollowById = async (req, res) => {
	try {
		const deleteResponse = await profileService.unfollowById(Number(req.params.userId), Number(req.user.id));
		if (deleteResponse === 0) throw new HTTPError(404, 'Not following user');
		res.sendStatus(204);
	}
	catch (error) {
		if (error instanceof HTTPError) return res.status(error.statusCode).json({ message: error.message });
		res.status(500).json({ message: error.message });
	}
};

module.exports = { searchProfiles, getUserById, getFollowersById, getFollowingById, unfollowById, followUser, updateProfile };