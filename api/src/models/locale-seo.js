module.exports = function (sequelize, DataTypes) {
  const LocaleSeo = sequelize.define('LocaleSeo', {
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
    tableName: 'locale_seos',
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

  LocaleSeo.associate = function (models) {

  }

  return LocaleSeo
}