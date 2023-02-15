const Joi = require('joi');

const getByUserIdValidator = (req, res, next) => {
	const { error } = Joi.object({
		userId: Joi.number().integer().required()
	}).validate(req.params);
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

module.exports = { getByUserIdValidator, deleteByUserIdValidator };