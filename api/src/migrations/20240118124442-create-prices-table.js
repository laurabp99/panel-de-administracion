'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      priceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'prices',
          key: 'id'
        }
      },
      taxId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'taxes',
          key: 'id'
        }
      },
      basePrice: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      current: {
        defaultValue: 1,
        type: Sequelize.BOOLEAN
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

    await queryInterface.addIndex('prices', ['priceId'], {
      name: 'prices_priceId_fk'
    })

    await queryInterface.addIndex('prices', ['taxId'], {
      name: 'prices_taxId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prices')
  }
}
