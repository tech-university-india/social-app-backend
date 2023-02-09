const profileService = require('../services/profile.service');
const HTTPError = require('../errors/httperror');

const getUserById = async (req, res) => {
	try{
		const user = await profileService.getUserById(req.params.userId);
		// console.log(req.user);
		res.status(200).json(user);
	} catch(err) {
		if(err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};

const getFollowersById = async (req,res) => {
	try{
		const followers = await profileService.getFollowers(req.params.userId);
		res.status(200).json(followers);
	}
	catch(error){
		if(error instanceof HTTPError) return res.status(error.statusCode).json({ message: error.message });
		res.status(400).json({ message: error.message });
	}
};

module.exports = { getUserById,getFollowersById };