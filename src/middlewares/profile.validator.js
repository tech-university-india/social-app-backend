const Joi = require('joi');

// const postUserSchema = Joi.object({
// 	FMNO: Joi.number().required(),
// 	username: Joi.string().min(3).max(30).required(),
// 	password: Joi.string().min(8).max(30).required(),
// 	email: Joi.string().email().required(),
// 	bio: Joi.string().max(100),
// 	designation: Joi.string().max(30),
// 	profilePictureURL: Joi.string().uri()
// });
	

const getProfileByIdValidator = (req, res, next) => {
	const { error } = Joi.object({
		userId: Joi.number().integer().required()
	}).validate(req.params);
	if (error) return res.status(400).json({ message: error.message });
	next();
};

const postFollowUserValidator = (req, res, next) => {
	const { error } = Joi.object({
		userId: Joi.number().integer().required()
	}).validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	next();
};

module.exports = { getProfileByIdValidator, postFollowUserValidator };