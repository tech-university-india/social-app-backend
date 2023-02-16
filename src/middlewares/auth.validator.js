/* eslint-disable no-unused-vars */
const Joi = require('joi');
const JWT = require('jsonwebtoken');

const HTTPError = require('../errors/httperror');

const registerDTO = Joi.object({
	FMNO: Joi.number().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(30).required(),
	userName: Joi.string().min(3).max(30).required(),
	bio: Joi.string().max(255),
	designation: Joi.string().min(3).max(30).required(),
	profilePictureURL: Joi.string().uri()
});

const loginDTO = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(30).required()
});

const registerValidator = (req, res, next) => {
	const { error } = registerDTO.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	next();
};

const loginValidator = (req, res, next) => {
	const { error } = loginDTO.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	next();
};

const JWTVaidator = (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		if (!token) throw new HTTPError(401, 'Access denied');
		const verifiedData = JWT.verify(token, process.env.JWT_SECRET);
		const { error } = Joi.object({ id: Joi.number().required() }).validate(verifiedData);
		if (error) throw new HTTPError(401, 'Invalid Token');
		req.user = verifiedData;
		next();
	} catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(400).json({ message: err.message });
	}

};


module.exports = { registerValidator, loginValidator, JWTVaidator };