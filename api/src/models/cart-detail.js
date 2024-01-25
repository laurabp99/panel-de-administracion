module.exports = function (sequelize, DataTypes) {
  const CartDetail = sequelize.define('CartDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Cart".'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "ProductId".'
      }
    },
    localeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "LocaleId".'
      }
    },
    priceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "PriceId".'
      }
    },
    priceDiscountId: {
      type: DataTypes.INTEGER,
    },
    taxId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "TaxId".'
      }
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "ProductName".'
      }
    },
    basePrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "BasePrice".'
      }
    },
    taxPrice: {
      type: DataTypes.DECIMAL(6, 2),
      notNull: {
        msg: 'Por favor, rellena el campo "TaxPrice".'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Quantity".'
      }
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
    tableName: 'cart_details',
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
        name: 'cart_details_cartId_fk',
        using: 'BTREE',
        fields: [
          { name: 'cartId' }
        ]
      },
      {
        name: 'cart_details_productId_fk',
        using: 'BTREE',
        fields: [
          { name: 'productId' }
        ]
      },
      {
        name: 'cart_details_localeId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeId' }
        ]
      },
      {
        name: 'cart_details_priceId_fk',
        using: 'BTREE',
        fields: [
          { name: 'priceId' }
        ]
      },
      {
        name: 'cart_details_taxId_fk',
        using: 'BTREE',
        fields: [
          { name: 'taxId' }
        ]
      },
    ]
  })

  CartDetail.associate = function (models) {
    CartDetail.belongsTo(models.Cart, { as: 'cart', foreignKey: 'cartId' })
    CartDetail.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
    CartDetail.belongsTo(models.Locale, { as: 'locale', foreignKey: 'localeId' })
    CartDetail.belongsTo(models.Price, { as: 'price', foreignKey: 'priceId' })
    CartDetail.belongsTo(models.PriceDiscount, { as: 'priceDiscount', foreignKey: 'priceDiscountId' })
    CartDetail.belongsTo(models.Tax, { as: 'tax', foreignKey: 'taxId' })
  }

  return CartDetail
}