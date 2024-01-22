module.exports = function (sequelize, DataTypes) {
  const PriceDiscount = sequelize.define('PriceDiscount', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    priceId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    percentage: {
      type: Sequelize.DECIMAL
    },
    multiplier: {
      type: Sequelize.DECIMAL
    },
    current: {
      type: Sequelize.BOOLEAN
    },
    startsAt: {
      type: Sequelize.DATE
    },
    endsAt: {
      type: Sequelize.DATE
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
    tableName: 'price_discounts',
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

  PriceDiscount.associate = function (models) {

  }

  return PriceDiscount
}