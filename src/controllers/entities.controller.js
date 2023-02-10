const entitiesService = require('../services/entities.service');
const HTTPError = require('../errors/httperror');

// POST for announcement and normal post
const entityController = async (req, res) => {
  try {
    const { type, caption, imageURL, meta, location, createdBy } = req.body;
    const newPost = await entitiesService.createPost(type, caption, imageURL, meta, location, createdBy);
    res.status(201).json(newPost);
  }

  catch (err) {
    if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

module.exports = { entityController };

