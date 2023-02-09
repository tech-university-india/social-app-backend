const { User,Follow } = require('../models');
const HTTPError = require('../errors/httperror');

const getUserById = async (id) => {
	// const user = await User.findOne({ where: { FMNO: id } });
	const user = await User.findByPk(id);
	if(!user) throw new HTTPError(404, 'User not found');
	return user;
};

const getFollowersById = async (id) => {

	const isUser = await User.findOne({ where: { FMNO: id } });
	if(!isUser) throw new HTTPError(404,'User not found');

	const followers = await Follow.findAll({where: {followingId:id}});
	if(followers.length===0){
		return [];
	}
	const followersId = [];
	followers.forEach(follower => {
		followersId.push(follower.dataValues.followerId);
	});
	const followingData = await Follow.findAll({where:{followerId:id,followingId:followersId}}); 
	const followingIds = [];
	const followersData = await User.findAll({where:{FMNO:followersId}});
	followingData.forEach(follower => {
		followingIds.push(follower.dataValues.followingId);
	});
	const followersDetails = [];
	followersData.forEach(follower => {
		const {FMNO,email,designation,profilePictureURL} = follower.dataValues;
		if(FMNO in followingIds){
			followersDetails.push({FMNO,email,designation,isFollowed:true,profilePictureURL});
		}
		else{
			followersDetails.push({FMNO,email,designation,isFollowed:false,profilePictureURL});
		}
	});
	return followersDetails;
};

module.exports = { getUserById ,getFollowersById };
