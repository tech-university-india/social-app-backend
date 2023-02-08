const Joi = require('joi');

const getProfileByIdValidator = (req, res, next) => {
    const { error } = Joi.number().integer().validate(req.params.userId);
    if (error) return res.status(400).json({ message: error.message });
    next();
}

module.exports = { getProfileByIdValidator };