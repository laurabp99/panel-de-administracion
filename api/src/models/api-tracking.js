module.exports = function (sequelize, DataTypes) {
  const ApiTracking = sequelize.define('ApiTracking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
    },
    fingerprintId: {
      type: DataTypes.INTEGER,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Ip".'
      }
    },
    isRobot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "isRobot".'
      }
    },
    resource: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Resource".'
      }
    },
    resourceElement: {
      type: DataTypes.INTEGER
    },
    method: {
      allowNull: false,
      type: DataTypes.STRING,
      notNull: {
        msg: 'Por favor, rellena el campo "Method".'
      }
    },
    httpCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "HttpCode".'
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    startTime: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "StartTime".'
      }
    },
    endTime: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "EndTime".'
      }
    },
    latencyMS: {
      type: DataTypes.DOUBLE,
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
      },
      {
        name: 'api_trackings_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'api_trackings_fingerprintId_fk',
        using: 'BTREE',
        fields: [
          { name: 'fingerprintId' }
        ]
      },
    ]
  })

  ApiTracking.associate = function (models) {
    ApiTracking.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
    ApiTracking.belongsTo(models.Fingerprint, { as: 'fingerprint', foreignKey: 'fingerprintId' })
  }

  return ApiTracking
}