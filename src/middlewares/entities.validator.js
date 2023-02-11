const Joi = require('joi');
const { entityTypes } = require('../Utils/Constants');

// const HTTPError = require('../errors/httperror');

const entity = Joi.object({
  type: Joi.string().valid(entityTypes.ANNOUNCEMENT, entityTypes.POST).required(),
  caption: Joi.string(),
  imageURL: Joi.array().items(Joi.string()),
  meta: {
    date: Joi.string(),
    venue: Joi.string()
  },
  location: Joi.array().items(Joi.string()),
  createdBy: Joi.string().required()
});

const entityValidator = (req, res, next) => {
  const { error } = entity.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

module.exports = { entityValidator };
