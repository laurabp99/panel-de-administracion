'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      countryId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dialCodeId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      postalCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fiscalAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comercialAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      web: {
        type: Sequelize.STRING
      },
      fiscalName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comercialName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      vat: {
        allowNull: false,
        type: Sequelize.STRING
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('companies')
  }
}
