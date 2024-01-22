module.exports = function (sequelize, DataTypes) {
  const ProductCategoryRelation = sequelize.define('ProductCategoryRelation', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productCategoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
    tableName: 'product_category_relations',
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

  ProductCategoryRelation.associate = function (models) {

  }

  return ProductCategoryRelation
}