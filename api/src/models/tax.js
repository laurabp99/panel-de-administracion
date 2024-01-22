module.exports = function (sequelize, DataTypes) {
  const Tax = sequelize.define('Tax', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    countryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    rate: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    multiplier: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    current: {
      type: Sequelize.BOOLEAN,
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
    tableName: 'taxes',
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

  Tax.associate = function (models) {

  }

  return Tax
}