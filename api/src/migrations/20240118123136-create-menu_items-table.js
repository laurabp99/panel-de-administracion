'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('menu_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menuId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      localeSeoId: {
        type: Sequelize.INTEGER
      },
      localeSeoSlugId: {
        type: Sequelize.INTEGER
      },
      parent: {
        type: Sequelize.INTEGER
      },
      customUrl: {
        type: Sequelize.STRING
      },
      private: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.BOOLEAN
      },
      order: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('menu_items')
  }
}
