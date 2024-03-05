module.exports = function (sequelize, DataTypes) {
  const ProductCategory = sequelize.define('ProductCategory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Name".'
      }
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Visible".'
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
    tableName: 'product_categories',
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

  ProductCategory.associate = function (models) {
    ProductCategory.belongsToMany(models.Product, { through: models.ProductCategoryRelation, as: 'products', foreignKey: 'productCategoryId' })
  }

  return ProductCategory
}