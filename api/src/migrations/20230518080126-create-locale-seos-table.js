'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('locale_seos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      languageAlias: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      redirection: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      menu: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
      },
      changeFrequency: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.DECIMAL
      },
      sitemap: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
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

    LocaleSeo.associate = function (models) {
      LocaleSeo.hasMany(models.CustomerTracking, { as: 'customerTrackings', foreignKey: 'localeSeoId' })
      LocaleSeo.hasMany(models.LocaleSeoRedirect, { as: 'localeSeoRedirects', foreignKey: 'localeSeoId' })
      LocaleSeo.hasMany(models.LocaleSeoSlug, { as: 'localeSeoSlug', foreignKey: 'localeSeoId' })
      LocaleSeo.hasMany(models.MenuItem, { as: 'menuItem', foreignKey: 'localeSeoId' })
      LocaleSeo.hasMany(models.PageTracking, { as: 'pageTrackings', foreignKey: 'localeSeoId' })
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('locale_seos')
  }
}