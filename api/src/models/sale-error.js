module.exports = function (sequelize, DataTypes) {
  const SaleError = sequelize.define('SaleError', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    paymentMethodId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cartId: {
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
    tableName: 'sale_errors',
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

  SaleError.associate = function (models) {

  }

  return SaleError
}