module.exports = function (sequelize, DataTypes) {
  const Sale = sequelize.define('Sale', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cartId: {
      type: Sequelize.INTEGER,
    },
    customerId: {
      type: Sequelize.INTEGER,
    },
    paymentMethodId: {
      type: Sequelize.INTEGER,
    },
    couponId: {
      type: Sequelize.INTEGER,
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
    saleDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    saleTime: {
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
    tableName: 'sales',
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

  Sale.associate = function (models) {

  }

  return Sale
}