const { Entity } = require('../models');
const createPost = async (type, caption, imageURL, meta, location, createdBy) => {
  const newPost = {
    type,
    caption,
    imageURL,
    meta: {
      date: meta.date,
      venue: meta.venue
    },
    location,
    createdBy
  };

  return Entity.create(newPost);
};

module.exports = { createPost };