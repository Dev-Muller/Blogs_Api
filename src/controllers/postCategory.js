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

const findAllPosts = async (req, res) => {
  try {
    const allPosts = await postCategoryService.findAllPosts();
    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postCategoryService.getPostById(id);
    if (post.message) {
      return res.status(404).json(post);
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { data } = req.user;
    const post = await postCategoryService.updatePost(id, title, content, data.id);
    if (post.message) {
      return res.status(401).json(post);
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const { data } = req.user;
    const post = await postCategoryService.deletePost(id, data.id);
    if (post.message) {
      return res.status(401).json(post);
    }
    return res.status(204).json({});
};

const searchPost = async (req, res) => {
  try {
    const { q } = req.query;
    console.log('log no q:', q);
    const post = await postCategoryService.searchPost(q);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  createPost,
  findAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};