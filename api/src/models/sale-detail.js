module.exports = function (sequelize, DataTypes) {
  const SaleDetail = sequelize.define('SaleDetail', {
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
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    localeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    priceId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    priceDiscountId: {
      type: Sequelize.INTEGER,
    },
    taxId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    basePrice: {
      type: Sequelize.DECIMAL(6, 2),
      allowNull: false
    },
    taxPrice: {
      type: Sequelize.DECIMAL(6, 2),
      allowNull: false
    },
    quantity: {
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
    tableName: 'sale_details',
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

  SaleDetail.associate = function (models) {

  }

  return SaleDetail
}