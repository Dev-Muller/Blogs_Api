const postCategoryService = require('../services/postCategoryService');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { data } = req.user;
    const postCategory = await postCategoryService.createPost(title, content, categoryIds, data.id);
    if (postCategory.message) {
      return res.status(400).json(postCategory);
    }
    return res.status(201).json(postCategory);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  createPost,
};