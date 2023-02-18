const Joi = require('joi');

const searchProfilesSchema = Joi.object({
	query: Joi.object({
		userName: Joi.string().min(1).max(30),
		interestName: Joi.string().min(1).max(30),
		pageDate: Joi.number().integer(),
		page: Joi.number().integer(),
		size: Joi.number().integer()
	})
});

const searchProfilesValidator = (req, res, next) => {
	const { error } = searchProfilesSchema.validate({ query: req.query });
	if (error) return res.status(400).json({ message: error.message });
	next();
};

const getByUserIdValidator = (req, res, next) => {
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

const deleteByUserIdValidator = (req, res, next) => {
	const { error } = Joi.object({
		userId: Joi.number().integer().required()
	}).validate(req.params);
	if (error) return res.status(400).json({ message: error.message });
	next();
};

const updateProfileValidator = (req, res, next) => {
	const { error } = Joi.object({
		userName: Joi.string().min(3).max(30).required(),
		designation: Joi.string().max(30),
		bio: Joi.string().max(100),
		profilePictureURL: Joi.string().uri(),
		interests: Joi.array().items(Joi.object())
	}).validate(req.body);

	if (error) return res.status(400).json({ message: error.message });
	next();
};


module.exports = { searchProfilesValidator, getByUserIdValidator, postFollowUserValidator, deleteByUserIdValidator, updateProfileValidator };
