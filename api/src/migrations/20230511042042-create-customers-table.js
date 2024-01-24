'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customers', {
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
        onDelete: 'NO ACTION'
      },
      cityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      dialCodeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'dial_codes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telephone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
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

    Customer.associate = function (models) {
      Customer.hasMany(models.ApiTracking, { as: 'apiTrackings', foreignKey: 'customerId' })
      Customer.hasMany(models.Cart, { as: 'carts', foreignKey: 'customerId' })
      Customer.hasMany(models.CustomerTracking, { as: 'customerTrackings', foreignKey: 'customerId' })
      Customer.hasMany(models.EmailError, { as: 'emailErrors', foreignKey: 'customerId' })
      Customer.hasMany(models.Fingerprint, { as: 'fingerprints', foreignKey: 'customerId' })
      Customer.hasMany(models.Invoice, { as: 'invoices', foreignKey: 'customerId' })
      Customer.hasMany(models.PageTracking, { as: 'pageTrackings', foreignKey: 'customerId' })
      Customer.hasMany(models.ReturnError, { as: 'returnErrors', foreignKey: 'customerId' })
      Customer.hasMany(models.Return, { as: 'returns', foreignKey: 'customerId' })
      Customer.hasMany(models.SaleError, { as: 'saleErrors', foreignKey: 'customerId' })
      Customer.hasMany(models.Sale, { as: 'sales', foreignKey: 'customerId' })
      Customer.hasMany(models.SentEmail, { as: 'sentEmails', foreignKey: 'customerId' })
      Customer.hasMany(models.Ticket, { as: 'tickets', foreignKey: 'customerId' })
    }

    await queryInterface.addIndex('customers', ['email'], {
      name: 'customers_email_index'
    })

    await queryInterface.addIndex('customers', ['countryId'], {
      name: 'customers_countryId_fk'
    })

    await queryInterface.addIndex('customers', ['cityId'], {
      name: 'customers_cityId_fk'
    })

    await queryInterface.addIndex('customers', ['dialCodeId'], {
      name: 'customers_dialCodeId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customers')
  }
}
