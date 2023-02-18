const { User, Interest, Follow, UserInterest } = require('../models');
const HTTPError = require('../errors/httperror');
const paginationUtil = require('../utils/pagination.util');

const sequelize = require('sequelize');

const searchProfiles = async (userId, userName, interestName, options) => {
	const { pageTimeStamp, limit, offset, nextURL } = paginationUtil.paginate(options); 
	const userWhereQuery = { updatedAt: { [sequelize.Op.lt]: pageTimeStamp }};
	const interestWhereQuery = {};
	if (userName) userWhereQuery.userName = { [sequelize.Op.iLike]: `%${userName}%` };
	if (interestName) interestWhereQuery.interestName = { [sequelize.Op.iLike]: `%${interestName}%` };
	const profiles = await User.findAll({
		attributes: ['FMNO', 'userName', 'bio', 'designation', 'profilePictureURL', 'updatedAt'],
		include: [{
			model: Interest,
			attributes: ['id', 'interestName'],
			through: { attributes: [] },
			where: interestWhereQuery,
			// required: false,
		}, {
			association: 'Following',
			attributes: ['FMNO'],
			through: { attributes: [] },
			where: { FMNO: userId },
			required: false,
		}],
		where: userWhereQuery,
		order: [['userName', 'ASC'], ['FMNO', 'ASC'], [Interest, 'interestName', 'ASC']],
		limit: limit, offset: offset
	});
	return { items: profiles, meta: { next: profiles.length < limit ? null : nextURL }};
};

const getUserById = async (id, userId) => {
	const user = await User.findByPk(id, {
		attributes: ['FMNO', 'userName', 'bio', 'designation', 'profilePictureURL', 'updatedAt'],
		include: [{
			model: Interest,
			attributes: ['id', 'interestName'],
			through: { attributes: [] },
			required: false,
		}, {
			association: 'Following',
			attributes: ['FMNO'],
			through: { attributes: [] },
			where: { FMNO: userId },
			required: false,
		}],
		order: [[Interest, 'interestName', 'ASC']],
	});
	if (!user) throw new HTTPError(404, 'User not found');
	return user;
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
	if (userDataUpdateBio[0] === 0) throw new HTTPError(400, 'User not updated');
	await UserInterest.destroy({
		where: {
			userId: id
		}
	});
	const updatedInterests = await UserInterest.bulkCreate(data.interests.map((interest) => ({ userId: id, interestId: interest.interestId }) ));
	return { updateProfile: userDataUpdateBio[0], updatedInterests: updatedInterests };
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

const followUser = async (followerId, followingId) => {
	return await Follow.create({
		followerId: followerId,
		followingId: followingId
	});

};

const unfollowById = async (id, userId) => {
	return await Follow.destroy({ where: { followerId: userId, followingId: id } });
};

module.exports = { searchProfiles, getUserById, getFollowersById, getFollowingById, unfollowById, followUser, updateProfile };
