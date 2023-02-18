const Joi = require('joi');
const { actionTypes } = require('../utils/constants');

const postActionSchema = Joi.object({
	type: Joi.string().valid(actionTypes.LIKE, actionTypes.COMMENT).required(),
	entityId: Joi.number().integer().required(),
	meta: Joi.object().keys({
		comment: Joi.string()
	}),
});

const postActionValidator = (req, res, next) => {
	const { error } = postActionSchema.validate(req.body);
	if (error) return res.status(400).json({ error: error.message });
	next();
};

const deleteActionValidator = (req, res, next) => {
	const { error } = Joi.object({ actionId: Joi.number().integer().required() }).validate(req.params);
	if (error) return res.status(400).json({ error: error.message });
	next();
};

module.exports = { postActionValidator, deleteActionValidator };