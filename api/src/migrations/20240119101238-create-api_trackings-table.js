'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('api_trackings', {
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
      ip: {
        type: Sequelize.INTEGER
      },
      isRobot: {
        defaultValue: 0,
        type: Sequelize.BOOLEAN
      },
      resource: {
        allowNull: false,
        type: Sequelize.STRING
      },
      resourceElement: {
        type: Sequelize.INTEGER
      },
      method: {
        allowNull: false,
        type: Sequelize.STRING
      },
      httpCode: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      method: {
        type: Sequelize.TEXT
      },
      startTime: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      endTime: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      latencyMS: {
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

    await queryInterface.addIndex('api_trackings', ['customerId'], {
      name: 'api_trackings_customerId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('api_trackings')
  }
}
