const { User,Follow} = require('../models');
const HTTPError = require('../errors/httperror');

const getUserById = async (id) => {

	const user = await User.findByPk(id);
	if(!user) throw new HTTPError(404, 'User not found');
	return user;
};

const getFollowersById = async (id) => {
	const followersData = await User.findByPk(id, { 
		include: {
			association: 'Followers',
			attributes: ['FMNO','designation', 'userName', 'profilePictureURL'],
			through: { attributes: [] },
			include: {
				association: 'Following',
				attributes: ['FMNO','designation', 'userName', 'profilePictureURL'],
				through: { attributes: [] },
			},
		},
	});
	if(!followersData) throw new HTTPError(404,'User not found');
	const followersDetails=followersData.Followers.map(follower => {
		const {FMNO,userName,designation,profilePictureURL} = follower.dataValues;
		let isFollowed = false;
		follower.dataValues.Following.forEach(following => {
			if(following.dataValues.FMNO===id) isFollowed = true;
		});
		return {FMNO,userName,designation,isFollowed:isFollowed,profilePictureURL};
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
