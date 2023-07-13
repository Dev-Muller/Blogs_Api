'use strict';

module.exports = {
  /**
     *  @param {import('sequelize').QueryInterface} queryInterface
     *  @param {import('sequelize').DataTypes} Sequelize
     * */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categories');
  }
};
