const postCategoryService = require('../services/postCategoryService');

const validatePostContent = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
  next();
};

const validatePostTitleAndContent = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
  next();
};

const validateUserPost = async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.user;
  const post = await postCategoryService.getPostById(id);
  if (post.message) {
    return res.status(404).json(post);
  }
  if (post.userId !== data.id) {
    return res.status(401).json({
      message: 'Unauthorized user',
    });
  }
  next();
};

module.exports = { validatePostContent, validatePostTitleAndContent, validateUserPost };