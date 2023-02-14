const { User, Interest, Follow } = require('../models');
const HTTPError = require('../errors/httperror');
//const { response } = require('express');

const getUserById = async (id) => {
	const user = await User.findByPk(id, {
		include: {
			model: Interest,
			attributes: ['id', 'interestName'],
			through: { attributes: [] },
		},
		attributes: ['FMNO', 'userName', 'bio', 'designation', 'profilePictureURL']
	});
	// const user = await User.findByPk(id, { 
	// 	include: {
	// 		association: 'Followers',
	// 		attributes: ['FMNO', 'userName', 'profilePictureURL'],
	// 		through: { attributes: [] },
	// 	} 
	// });
	if (!user) throw new HTTPError(404, 'User not found');
	return user;
};

const followUser = async (followerId, followingId) => {
	//const follower = await User.findByPk(followerId);
	const following = await User.findByPk(followingId);
	if (!following) throw new HTTPError(404, 'User not found');
	//await follower.addFollowing(following);
	//const data = { followerId: followerId, followingId: followingId };
	return await Follow.create({
		followerId: followerId,
		followingId: followingId

	});
	
};

const updateProfile = async (id, data) => {
	const user = await User.findByPk(id);
	if (!user) throw new HTTPError(404, 'User not found');
	return await user.update(data);
};

module.exports = { getUserById, followUser , updateProfile};