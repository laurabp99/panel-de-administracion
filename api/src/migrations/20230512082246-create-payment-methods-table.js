'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment_methods', {
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
      configuration: {
        type: Sequelize.JSON,
        allowNull: false
      },
      visible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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

    PaymentMethod.associate = function (models) {
      PaymentMethod.hasMany(models.ReturnError, { as: 'returnErrors', foreignKey: 'paymentMethodId' })
      PaymentMethod.hasMany(models.Return, { as: 'returns', foreignKey: 'paymentMethodId' })
      PaymentMethod.hasMany(models.SaleError, { as: 'saleErrors', foreignKey: 'paymentMethodId' })
      PaymentMethod.hasMany(models.Sale, { as: 'sales', foreignKey: 'paymentMethodId' })
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payment_methods')
  }
}
