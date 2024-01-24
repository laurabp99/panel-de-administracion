'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('emails', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false
      },
      path: {
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

    Email.associate = function (models) {
      Email.hasMany(models.EmailError, { as: 'emailErrors', foreignKey: 'emailId' })
      Email.hasMany(models.SentEmail, { as: 'sentEmails', foreignKey: 'emailId' })
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('emails')
  }
}
