module.exports = function (sequelize, DataTypes) {
  const Image = sequelize.define('Image', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    imageConfigurationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    entityId: {
      type: Sequelize.INTEGER
    },
    entity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    },
    originalFilename: {
      type: Sequelize.STRING
    },
    resizedFilename: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    alt: {
      type: Sequelize.STRING
    },
    languageAlias: {
      type: Sequelize.STRING,
      allowNull: false
    },
    mediaQuery: {
      type: Sequelize.STRING,
      allowNull: false
    },
    latencyMs: {
      type: Sequelize.INTEGER,
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
    tableName: 'images',
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

  Image.associate = function (models) {

  }

  return Image
}