const { User, Interest } = require('../models');
const HTTPError = require('../errors/httperror');

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
	if(!user) throw new HTTPError(404, 'User not found');
	return user;
};

module.exports = { getUserById };