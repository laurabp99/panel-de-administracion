module.exports = function (sequelize, DataTypes) {
  const ReturnError = sequelize.define('ReturnError', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    returnId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    paymentMethodId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    errorCode: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    errorMessage: {
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
    tableName: 'return_errors',
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

  ReturnError.associate = function (models) {

  }

  return ReturnError
}