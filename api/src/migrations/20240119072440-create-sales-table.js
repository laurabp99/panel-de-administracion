'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'carts',
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
      paymentMethodId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'payment_methods',
          key: 'id'
        }
      },
      couponId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'coupons',
          key: 'id'
        }
      },
      reference: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      totalPrice: {
        allowNull: false,
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
      saleDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      saleTime: {
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

    await queryInterface.addIndex('sales', ['cartId'], {
      name: 'sales_cartId_fk'
    })

    await queryInterface.addIndex('sales', ['customerId'], {
      name: 'sales_customerId_fk'
    })

    await queryInterface.addIndex('sales', ['paymentMethodId'], {
      name: 'sales_paymentMethodId_fk'
    })

    await queryInterface.addIndex('sales', ['couponId'], {
      name: 'sales_couponId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales')
  }
}
