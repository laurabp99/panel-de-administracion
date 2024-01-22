module.exports = function (sequelize, DataTypes) {
  const Locale = sequelize.define('Locale', {
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
    entity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    entityId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    key: {
      type: Sequelize.STRING,
      allowNull: false
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false
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
    tableName: 'locales',
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

  Locale.associate = function (models) {

  }

  return Locale
}