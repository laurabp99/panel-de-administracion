module.exports = function (sequelize, DataTypes) {
  const Return = sequelize.define('Return', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    saleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    paymentMethodId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reference: {
      type: Sequelize.STRING,
      allowNull: false
    },
    totalPrice: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    totalBasePrice: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    totalTaxPrice: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    returnDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    returnTime: {
      type: Sequelize.TIME,
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
    tableName: 'returns',
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

  Return.associate = function (models) {

  }

  return Return
}