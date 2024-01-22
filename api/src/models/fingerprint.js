module.exports = function (sequelize, DataTypes) {
  const Fingerprint = sequelize.define('Fingerprint', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerId: {
      type: Sequelize.INTEGER,
    },
    cityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    fingerprint: {
      type: Sequelize.STRING,
      allowNull: false
    },
    browser: {
      type: Sequelize.STRING,
      allowNull: false
    },
    browserVersion: {
      type: Sequelize.STRING,
      allowNull: false
    },
    os: {
      type: Sequelize.STRING,
      allowNull: false
    },
    osVersion: {
      type: Sequelize.STRING,
      allowNull: false
    },
    screenHeight: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    screenWidth: {
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
    tableName: 'fingerprints',
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

  Fingerprint.associate = function (models) {

  }

  return Fingerprint
}