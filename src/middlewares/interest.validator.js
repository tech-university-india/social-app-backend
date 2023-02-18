const Joi = require('joi');

const interestObject = Joi.object({
	interestName: Joi.string().required()
});

const postInterestValidator = (req,res, next) => {
	const { error } = interestObject.validate(req.body);
	if(error) return res.status(400).json({ message: error.message });
	next();
};

module.exports = { postInterestValidator };