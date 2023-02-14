const profileService = require('../services/profile.service');
const HTTPError = require('../errors/httperror');

const getUserById = async (req, res) => {
	try{
		const user = await profileService.getUserById(req.params.userId, req.user.id);
		res.status(200).json(user);
	} catch(err) {
		if(err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};

const getFollowersById = async (req,res) => {
	try{
		const followers = await profileService.getFollowersById(Number(req.params.userId),Number(req.user.id));
		res.status(200).json(followers);
	}
	catch(error){
		if(error instanceof HTTPError) return res.status(error.statusCode).json({ message: error.message });
		res.status(500).json({ message: error.message });
	}
};

const getFollowingById = async (req,res) => {
	try{
		const followers = await profileService.getFollowingById(Number(req.params.userId),Number(req.user.id));
		res.status(200).json(followers);
	}
	catch(error){
		if(error instanceof HTTPError) return res.status(error.statusCode).json({ message: error.message });
		res.status(500).json({ message: error.message });
	}
};

module.exports = { getUserById,getFollowersById,getFollowingById };