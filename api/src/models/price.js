module.exports = function (sequelize, DataTypes) {
  const Price = sequelize.define('Price', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    productId: {
      type: Sequelize.INTEGER,
    },
    taxId: {
      type: Sequelize.INTEGER,
    },
    basePrice: {
      type: Sequelize.DECIMAL
    },
    current: {
      type: Sequelize.BOOLEAN
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
    tableName: 'prices',
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

  Price.associate = function (models) {

  }

  return Price
}