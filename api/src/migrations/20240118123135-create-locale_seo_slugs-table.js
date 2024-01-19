'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('locale_seo_slugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      localeSeoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'locale_seos',
          key: 'id'
        }
      },
      parentsSlugId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      languageAlias: {
        allowNull: false,
        type: Sequelize.STRING
      },
      relParent: {
        type: Sequelize.STRING
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING
      },
      key: {
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      redirection: {
        defaultValue: 0,
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

    await queryInterface.addIndex('locale_seo_slugs', ['localeSeoId'], {
      name: 'locale_seo_slugs_localeSeoId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('locale_seo_slugs')
  }
}
