const { User} = require('../models');
const HTTPError = require('../errors/httperror');



const getUserById = async (id) => {

	const user = await User.findByPk(id);
	if(!user) throw new HTTPError(404, 'User not found');
	return user;
};

const getFollowersById = async (id) => {
	const followersData = await User.findByPk(id, { 
		include: {
			association: 'Following',
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
	if(followersData.Following.length===0)return [];

	const followersDetails=followersData.Following.map(following => {
		const {FMNO,userName,designation,profilePictureURL} = following.dataValues;
		let isFollowed = false;
		following.dataValues.Following.forEach(follower => {
			if(follower.dataValues.FMNO===id) isFollowed = true;
		});
		return {FMNO,userName,designation,isFollowed:isFollowed,profilePictureURL};
	});
	return followersDetails;
};

const getFollowingById = async (id) => {
	const followingData = await User.findByPk(id, { 
		include: {
			association: 'Followers',
			attributes: ['FMNO','designation', 'userName', 'profilePictureURL'],
			through: { attributes: [] },
			include: {
				association: 'Followers',
				attributes: ['FMNO','designation', 'userName', 'profilePictureURL'],
				through: { attributes: [] },
			}
		},
	});

	if(!followingData) throw new HTTPError(404,'User not found');
	if(followingData.Followers.length===0)return [];

	const followingDetails = followingData.Followers.map(follower => {
		const {FMNO,userName,designation,profilePictureURL} = follower.dataValues;
		let isFollowing = false;
		follower.dataValues.Followers.forEach(following => {
			if(following.dataValues.FMNO===id) isFollowing = true;
		});
		return {FMNO,userName,designation,isFollowing:isFollowing,profilePictureURL};
	});
	return followingDetails;
};

module.exports = { getUserById ,getFollowersById,getFollowingById };
