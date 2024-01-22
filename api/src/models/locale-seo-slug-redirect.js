module.exports = function (sequelize, DataTypes) {
  const LocaleSeoSlugRedirect = sequelize.define('LocaleSeoSlugRedirect', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    localeSeoSlugId: {
      type: Sequelize.INTEGER,
    },
    languageAlias: {
      type: Sequelize.STRING
    },
    oldUrl: {
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
    tableName: 'locale_seo_slug_redirects',
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

  LocaleSeoSlugRedirect.associate = function (models) {

  }

  return LocaleSeoSlugRedirect
}