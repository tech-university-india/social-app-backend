const Joi = require('joi');

const getInterestByNameSchema = Joi.object({
	interestName: Joi.string().min(1).max(30),
	pageDate: Joi.number().integer(),
	page: Joi.number().integer(),
	size: Joi.number().integer()
});

const postInterestSchema = Joi.object({
	interestName: Joi.string().required()
});

const getInterestByNameValidator = (req,res, next) => {
	console.log(req.query);
	const { error } = getInterestByNameSchema.validate(req.query);
	if(error) return res.status(400).json({ message: error.message });
	next();
};

const postInterestValidator = (req,res, next) => {
	const { error } = postInterestSchema.validate(req.body);
	if(error) return res.status(400).json({ message: error.message });
	next();
};

module.exports = { getInterestByNameValidator, postInterestValidator };