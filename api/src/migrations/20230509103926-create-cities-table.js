'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cities', {
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
      name: {
        type: Sequelize.STRING,
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

    City.associate = function (models) {
      City.hasMany(models.Company, { as: 'companies', foreignKey: 'cityId' })
      City.hasMany(models.Customer, { as: 'customers', foreignKey: 'cityId' })
      City.hasMany(models.Fingerprint, { as: 'fingerprints', foreignKey: 'cityId' })
    }

    await queryInterface.addIndex('cities', ['countryId'], {
      name: 'cities_countryId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cities')
  }
}
