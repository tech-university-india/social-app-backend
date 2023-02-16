const { User, Interest, Follow, UserInterest } = require('../models');
const HTTPError = require('../errors/httperror');
//const { response } = require('express');

const sequelize = require('sequelize');

const getUserById = async (id, userId) => {
	const user = await User.findByPk(id, {
		attributes: ['FMNO', 'userName', 'bio', 'designation', 'profilePictureURL', [sequelize.literal('(SELECT COUNT("Following"."FMNO"))'), 'isFollowed']],
		include: [{
			model: Interest,
			attributes: ['id', 'interestName'],
			through: { attributes: [] },
			required: false,
		}, {
			association: 'Following',
			attributes: [],
			through: { attributes: [] },
			where: { FMNO: userId },
			required: false,
		}],
		group: ['"User"."FMNO"', '"Interests"."id"', '"Following"."FMNO"'],
		order: [[Interest, 'interestName', 'ASC']],
	});
	if (!user) throw new HTTPError(404, 'User not found');
	return user;
};

const followUser = async (followerId, followingId) => {
	//const follower = await User.findByPk(followerId);
	// const following = await User.findByPk(followingId);
	// if (!following) throw new HTTPError(404, 'User not found');
	//await follower.addFollowing(following);
	//const data = { followerId: followerId, followingId: followingId };
	return await Follow.create({
		followerId: followerId,
		followingId: followingId
	});

};

const updateProfile = async (id, data) => {
	const userDataUpdateBio = await User.update({
		userName: data.userName,
		bio: data.bio,
		designation: data.designation,
		profilePictureURL: data.profilePictureURL
	}, {
		where: { FMNO: id }
	});
	if (!userDataUpdateBio) throw new HTTPError(400, 'User not updated');
	await UserInterest.destroy({
		where: {
			userId: id
		}
	});

	const temp = data.interests.map((interest) => ({
		userId: id,
		interestId: interest.interestId
	}));

	const updatedInterests = await UserInterest.bulkCreate(temp);
	return { updateProfile: userDataUpdateBio, updatedInterests: updatedInterests };
};

const getFollowersById = async (id, userId) => {
	// const followersData = await User.findByPk(id, { 
	// 	attributes: [],
	// 	include: {
	// 		association: 'Following',
	// 		attributes: ['FMNO','designation', 'userName', 'profilePictureURL'],
	// 		through: { attributes: [] },
	// 		required: false,
	// 	},
	// });
	// // Filter "Follows" By paramUserId JOIN with "Users" Filter and Count the "Following" of "Users" by requestedUserId
	const followersData = await Follow.findAll({
		where: { followingId: id },
		attributes: [],
		include: {
			model: User,
			on: { 'FMNO': { [sequelize.Op.eq]: sequelize.col('Follow.followerId') } },
			attributes: ['FMNO', 'designation', 'userName', 'profilePictureURL', [sequelize.literal('(SELECT COUNT("User->Following"."FMNO"))'), 'isFollowed']],
			include: {
				association: 'Following',
				attributes: [],
				through: { attributes: [] },
				where: { FMNO: userId },
				required: false,
			},
			required: false,
		},
		group: ['"Follow"."id"', '"User"."FMNO"', '"User->Following"."FMNO"'],
		order: [[User, 'userName', 'ASC'], [User, 'FMNO', 'ASC']],
	});
	// if(!followersData) throw new HTTPError(404, 'User not found');
	return followersData;
};

const getFollowingById = async (id, userId) => {
	// const followingData = await User.findByPk(id, { 
	// 	include: {
	// 		association: 'Followers',
	// 		attributes: ['FMNO','designation', 'userName', 'profilePictureURL'],
	// 		through: { attributes: [] },
	// 		include: {
	// 			association: 'Followers',
	// 			attributes: ['FMNO','designation', 'userName', 'profilePictureURL'],
	// 			through: { attributes: [] },
	// 			where: { FMNO: userId },
	// 		}
	// 	},
	// });
	// // Filter "Follows" By paramUserId JOIN with "Users" Filter and Count the "Following" of "Users" by requestedUserId
	const followingData = await Follow.findAll({
		where: { followerId: id },
		attributes: [],
		include: {
			model: User,
			on: { 'FMNO': { [sequelize.Op.eq]: sequelize.col('Follow.followingId') } },
			attributes: ['FMNO', 'designation', 'userName', 'profilePictureURL', [sequelize.literal('(SELECT COUNT("User->Following"."FMNO"))'), 'isFollowed']],
			include: {
				association: 'Following',
				attributes: [],
				through: { attributes: [] },
				where: { FMNO: userId },
				required: false,
			},
			required: false,
		},
		group: ['"Follow"."id"', '"User"."FMNO"', '"User->Following"."FMNO"'],
		order: [[User, 'userName', 'ASC'], [User, 'FMNO', 'ASC']],
	});
	// if(!followingData) throw new HTTPError(404,'User not found');
	return followingData;
};

const unfollowById = async (id, userId) => {
	// const isFollowing = await Follow.findOne({ where: { followerId: userId, followingId: id } });
	// if (!isFollowing) throw new HTTPError(404, 'Not following user');
	return await Follow.destroy({ where: { followerId: userId, followingId: id } });
};

module.exports = { getUserById, getFollowersById, getFollowingById, unfollowById, followUser, updateProfile };
