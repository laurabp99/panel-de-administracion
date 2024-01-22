module.exports = function (sequelize, DataTypes) {
  const MenuItem = sequelize.define('MenuItem', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    menuId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    localeSeoId: {
      type: Sequelize.INTEGER,
    },
    localeSeoSlugId: {
      type: Sequelize.INTEGER,
    },
    parent: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    customUrl: {
      type: Sequelize.STRING
    },
    private: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    order: {
      type: Sequelize.INTEGER,
      defaultValue: 0
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
    tableName: 'menu_items',
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

  MenuItem.associate = function (models) {

  }

  return MenuItem
}