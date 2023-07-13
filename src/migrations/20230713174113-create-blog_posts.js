'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        type: Sequelize.INTERGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTERGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      published: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: false,
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};
