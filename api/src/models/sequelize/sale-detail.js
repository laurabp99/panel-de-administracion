module.exports = function (sequelize, DataTypes) {
  const SaleDetail = sequelize.define('SaleDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "SaleId".'
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
      type: DataTypes.INTEGER
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
      allowNull: false,
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
      },
      {
        name: 'sale_details_saleId_fk',
        using: 'BTREE',
        fields: [
          { name: 'saleId' }
        ]
      },
      {
        name: 'sale_details_productId_fk',
        using: 'BTREE',
        fields: [
          { name: 'productId' }
        ]
      },
      {
        name: 'sale_details_localeId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeId' }
        ]
      },
      {
        name: 'sale_details_priceId_fk',
        using: 'BTREE',
        fields: [
          { name: 'priceId' }
        ]
      },
      {
        name: 'sale_details_priceDiscountId_fk',
        using: 'BTREE',
        fields: [
          { name: 'priceDiscountId' }
        ]
      },
      {
        name: 'sale_details_taxId_fk',
        using: 'BTREE',
        fields: [
          { name: 'taxId' }
        ]
      },
    ]
  })

  SaleDetail.associate = function (models) {
    SaleDetail.belongsTo(models.Sale, { as: 'sale', foreignKey: 'saleId' })
    SaleDetail.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
    SaleDetail.belongsTo(models.Locale, { as: 'locale', foreignKey: 'localeId' })
    SaleDetail.belongsTo(models.Price, { as: 'price', foreignKey: 'priceId' })
    SaleDetail.belongsTo(models.PriceDiscount, { as: 'priceDiscount', foreignKey: 'priceDiscountId' })
    SaleDetail.belongsTo(models.Tax, { as: 'tax', foreignKey: 'taxId' })
  }

  return SaleDetail
}