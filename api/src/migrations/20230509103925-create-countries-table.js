'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('countries', {
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
      iso2: {
        type: Sequelize.STRING,
        allowNull: false
      },
      iso3: {
        type: Sequelize.STRING,
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

    Country.associate = function (models) {
      Country.hasMany(models.City, { as: 'cities', foreignKey: 'countryId' })
      Country.hasMany(models.Company, { as: 'companies', foreignKey: 'countryId' })
      Country.hasMany(models.Customer, { as: 'customers', foreignKey: 'countryId' })
      Country.hasMany(models.DialCode, { as: 'dialCodes', foreignKey: 'countryId' })
      Country.hasMany(models.Tax, { as: 'taxes', foreignKey: 'countryId' })
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('countries')
  }
}
