module.exports = function (sequelize, DataTypes) {
  const LocaleSeoSlug = sequelize.define('LocaleSeoSlug', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    localeSeoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    languageAlias: {
      type: Sequelize.STRING,
      allowNull: false
    },
    relParent: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    key: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    parentSlug: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    keywords: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  }, {
    sequelize,
    tableName: 'locale_seo_slugs',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      }
    ]
  })

  LocaleSeoSlug.associate = function (models) {

  }

  return LocaleSeoSlug
}