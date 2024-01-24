'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      featured: {
        type: Sequelize.BOOLEAN
      },
      visible: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })

    Product.associate = function (models) {
      Product.hasMany(models.CartDetail, { as: 'cartDetails', foreignKey: 'productId' })
      Product.hasMany(models.Price, { as: 'prices', foreignKey: 'productId' })
      Product.hasMany(models.ProductCategoryRelation, { as: 'productCategoryRelations', foreignKey: 'productId' })
      Product.hasMany(models.ReturnDetail, { as: 'returnDetails', foreignKey: 'productId' })
      Product.hasMany(models.SaleDetail, { as: 'saleDetails', foreignKey: 'productId' })
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products')
  }
}