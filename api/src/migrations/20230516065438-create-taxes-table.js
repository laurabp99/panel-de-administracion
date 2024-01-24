'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('taxes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'countries',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      multiplier: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      current: {
        type: Sequelize.BOOLEAN,
        allowNull: false
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

    Tax.associate = function (models) {
      Tax.hasMany(models.CartDetail, { as: 'cartDetails', foreignKey: 'taxId' })
      Tax.hasMany(models.Price, { as: 'prices', foreignKey: 'taxId' })
      Tax.hasMany(models.ReturnDetail, { as: 'returnDetails', foreignKey: 'taxId' })
      Tax.hasMany(models.SaleDetail, { as: 'saleDetails', foreignKey: 'taxId' })
    }

    await queryInterface.addIndex('taxes', ['countryId'], {
      name: 'taxes_countryId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('taxes')
  }
}
