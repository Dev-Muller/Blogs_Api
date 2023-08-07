/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  }, {tableName: 'posts_categories', timestamps: false, underscored: true});

  PostCategory.associate = function({ BlogPost, Category}) {
    Category.belongsToMany(BlogPost, {
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'category',
      through: PostCategory,
    });
    BlogPost.belongsToMany(Category, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
      through: PostCategory,
    });
  };
  return PostCategory;
};