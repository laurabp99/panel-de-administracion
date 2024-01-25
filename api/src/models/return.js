module.exports = function (sequelize, DataTypes) {
  const Return = sequelize.define('Return', {
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
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "CustomerId".'
      }
    },
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "PaymentMethodId".'
      }
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Reference".'
      }
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "TotalPrice".'
      }
    },
    totalBasePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "TotalBasePrice".'
      }
    },
    totalTaxPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "TotalTaxPrice".'
      }
    },
    returnDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "ReturnDate".'
      }
    },
    returnTime: {
      type: DataTypes.TIME,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "ReturnTime".'
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
      },
      {
        name: 'returns_saleId_fk',
        using: 'BTREE',
        fields: [
          { name: 'saleId' }
        ]
      },
      {
        name: 'returns_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'returns_paymentMethodId_fk',
        using: 'BTREE',
        fields: [
          { name: 'paymentMethodId' }
        ]
      },
    ]
  })

  Return.associate = function (models) {
    Return.belongsTo(models.Sale, { as: 'sale', foreignKey: 'saleId' })
    Return.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
    Return.belongsTo(models.PaymentMethod, { as: 'paymentMethod', foreignKey: 'paymentMethodId' })
    Return.belongsToMany(models.Product, { through: models.ReturnDetail, as: 'products', foreignKey: 'returnId' })
  }

  return Return
}