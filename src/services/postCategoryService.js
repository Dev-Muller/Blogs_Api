const { PostCategory, Category, BlogPost } = require('../models');

const createPost = async (title, content, categoryIds, id) => {
  const allCategory = await Category.findAll();
  const validCategory = allCategory.map((cId) => cId.id);
  const allValidCategory = categoryIds.every((catId) => validCategory.includes(catId));
  if (!allValidCategory) {
    return {
      message: 'one or more "categoryIds" not found',
    };
  }
  const createBlogPost = await BlogPost.create({ title, content, userId: id });
  await PostCategory
    .bulkCreate(categoryIds.map((category) =>
      ({ postId: createBlogPost.dataValues.id, categoryId: category })));
  return createBlogPost;
};

module.exports = {
  createPost,
};