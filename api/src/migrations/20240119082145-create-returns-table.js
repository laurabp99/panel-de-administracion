'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('returns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'sales',
          key: 'id'
        }
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
        }
      },
      payment_methodId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'payment_methods',
          key: 'id'
        }
      },
      reference: {
        allowNull: false,
        type: Sequelize.STRING
      },
      totalPrice: {
        unique: true,
        type: Sequelize.DECIMAL
      },
      totalBasePrice: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      totalTaxPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      returnDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      returnTime: {
        allowNull: false,
        type: Sequelize.TIME
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

    await queryInterface.addIndex('returns', ['saleId'], {
      name: 'returns_saleId_fk'
    })

    await queryInterface.addIndex('returns', ['customerId'], {
      name: 'returns_customerId_fk'
    })

    await queryInterface.addIndex('returns', ['payment_methodId'], {
      name: 'returns_payment_methodId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('returns')
  }
}