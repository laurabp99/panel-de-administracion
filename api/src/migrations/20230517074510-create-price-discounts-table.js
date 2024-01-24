'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('price_discounts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      priceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'prices',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      percentage: {
        type: Sequelize.DECIMAL
      },
      multiplier: {
        type: Sequelize.DECIMAL
      },
      current: {
        type: Sequelize.BOOLEAN
      },
      startsAt: {
        type: Sequelize.DATE
      },
      endsAt: {
        type: Sequelize.DATE
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

    PriceDiscount.associate = function (models) {
      PriceDiscount.hasMany(models.CartDetail, { as: 'cartDetails', foreignKey: 'priceDiscountId' })
      PriceDiscount.hasMany(models.ReturnDetail, { as: 'returnDetails', foreignKey: 'priceDiscountId' })
      PriceDiscount.hasMany(models.SaleDetail, { as: 'saleDetails', foreignKey: 'priceDiscountId' })
    }

    await queryInterface.addIndex('price_discounts', ['priceId'], {
      name: 'price_discounts_priceId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('price_discounts')
  }
}
