const { User} = require('../models');
const HTTPError = require('../errors/httperror');

const getUserById = async (id) => {
	const user = await User.findByPk(id);
	if(!user) throw new HTTPError(404, 'User not found');
	return user;
};

const getFollowersById = async (id,userId) => {
	const followersData = await User.findByPk(id, { 
		include: {
			association: 'Following',
			attributes: ['FMNO','designation', 'userName', 'profilePictureURL'],
			through: { attributes: [] },
			include: {
				association: 'Following',
				attributes: ['FMNO','designation', 'userName', 'profilePictureURL'],
				through: { attributes: [] },
				where: { FMNO: userId },
				required: false,
			},
			required: false,
		},
	});
	
	if(!followersData) throw new HTTPError(404,'User not found');
	if(followersData.Following.length===0)return [];
	return followersData;
};

const getFollowingById = async (id, userId) => {
	const followingData = await User.findByPk(id, { 
		include: {
			association: 'Followers',
			attributes: ['FMNO','designation', 'userName', 'profilePictureURL'],
			through: { attributes: [] },
			include: {
				association: 'Followers',
				attributes: ['FMNO','designation', 'userName', 'profilePictureURL'],
				through: { attributes: [] },
				where: { FMNO: userId },
			}
		},
	});

	if(!followingData) throw new HTTPError(404,'User not found');
	if(followingData.Followers.length===0)return [];
	return followingData;
};

module.exports = { getUserById ,getFollowersById,getFollowingById };