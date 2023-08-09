const { Op } = require('sequelize');
const { PostCategory, Category, BlogPost, User } = require('../models');

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

const findAllPosts = async () => {
 const findAll = await BlogPost
  .findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
 return findAll;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  if (!post) {
    return {
      message: 'Post does not exist',
    };
  }
  return post;
};

const updatePost = async (id, title, content, userId) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const findPostUserId = await BlogPost.findOne({ where: { id, userId } });
  if (!findPostUserId) {
    return { message: 'Unauthorized user' };
  }
  const post = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return post;
};

const deletePost = async (id, userId) => {
  const findPostUserId = await BlogPost.findOne({ where: { id, userId } });
  if (!findPostUserId) {
    return { message: 'Unauthorized user' };
  }
  await PostCategory.destroy({ where: { postId: id } });
  await BlogPost.destroy({ where: { id } });
  return {};
};

const searchPost = async (query) => {
  const post = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [{ model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    { model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return post;
};

module.exports = {
  createPost,
  findAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};
