'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fingerprints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
        }
      },
      fingerprint: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'id'
        }
      },
      browser: {
        type: Sequelize.STRING
      },
      browserVersion: {
        type: Sequelize.STRING
      },
      os: {
        type: Sequelize.STRING
      },
      osVersion: {
        type: Sequelize.STRING
      },
      screenHeight: {
        type: Sequelize.INTEGER
      },
      screenWidth: {
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

    await queryInterface.addIndex('fingerprints', ['customerId'], {
      name: 'fingerprints_customerId_fk'
    })

    await queryInterface.addIndex('fingerprints', ['cityId'], {
      name: 'fingerprints_cityId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('fingerprints')
  }
}