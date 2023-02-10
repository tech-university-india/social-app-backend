const { User,Follow} = require('../models');
const HTTPError = require('../errors/httperror');



const getUserById = async (id) => {

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
		followersDetails.push({FMNO,email,designation,isFollowed:followingIds.includes(FMNO),profilePictureURL});
	});
	return followersDetails;
};

const getFollowingById = async (id) => {

	const isUser = await User.findOne({ where: { FMNO: id } });
	if(!isUser) throw new HTTPError(404,'User not found');

	const followingList = await Follow.findAll({where: {followerId:id}});
	if(followingList.length===0){
		return [];
	}
	const followingIds = followingList.map(follower=> follower.dataValues.followingId);
	const followingUserData = await User.findAll({where:{FMNO:followingIds}});

	const followBackData = await Follow.findAll({where: {followingId:id}});
	const followBackIds = followBackData.map(follower=> follower.dataValues.followerId);

	const followingUsersDetails = followingUserData.map(follower=>{
		const {FMNO,userName,designation,profilePictureURL} = follower.dataValues;
		return {FMNO,userName,designation,isFollowed:followBackIds.includes(FMNO),profilePictureURL};
	});
	return followingUsersDetails;
};

module.exports = { getUserById ,getFollowersById,getFollowingById };
