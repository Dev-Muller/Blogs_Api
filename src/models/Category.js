/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  }, {tableName: 'categories', timestamps: false, underscored: true});

  // Category.associate = function(models) {
  //   Category.hasMany(models.Post, {
  //     foreignKey: 'category_id',
  //     as: 'categories'
  //   });
  // };
  return Category;
};