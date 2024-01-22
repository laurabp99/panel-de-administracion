module.exports = function (sequelize, DataTypes) {
  const ApiTracking = sequelize.define('ApiTracking', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerId: {
      type: Sequelize.INTEGER,
    },
    fingerprintId: {
      type: Sequelize.INTEGER,
    },
    ip: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isRobot: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    resource: {
      type: Sequelize.STRING,
      allowNull: false
    },
    resourceElement: {
      type: Sequelize.INTEGER
    },
    method: {
      allowNull: false,
      type: Sequelize.STRING
    },
    httpCode: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    startTime: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    endTime: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    latencyMS: {
      type: Sequelize.DOUBLE,
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
    tableName: 'api_trackings',
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

  ApiTracking.associate = function (models) {

  }

  return ApiTracking
}