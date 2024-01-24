'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prices', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      taxId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'taxes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      basePrice: {
        type: Sequelize.DECIMAL
      },
      current: {
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

    Price.associate = function (models) {
      Price.hasMany(models.CartDetail, { as: 'cartDetails', foreignKey: 'priceId' })
      Price.hasMany(models.PriceDiscount, { as: 'priceDiscounts', foreignKey: 'priceId' })
      Price.hasMany(models.ReturnDetail, { as: 'returnDetails', foreignKey: 'priceId' })
      Price.hasMany(models.SaleDetail, { as: 'saleDetails', foreignKey: 'priceId' })
    }

    await queryInterface.addIndex('prices', ['productId'], {
      name: 'prices_productId_fk'
    })

    await queryInterface.addIndex('prices', ['taxId'], {
      name: 'prices_taxId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prices')
  }
}
