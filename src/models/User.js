/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */

module.exports= (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {tableName: 'users', timestamps: false, underscored: true});

  User.associate = function(models) {
    User.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'posts'
    });
  };
  
  return User;
}