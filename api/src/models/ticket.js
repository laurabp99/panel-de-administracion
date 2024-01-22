module.exports = function (sequelize, DataTypes) {
  const Ticket = sequelize.define('Ticket', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    saleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    returnId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    reference: {
      type: Sequelize.STRING,
      allowNull: false
    },
    path: {
      type: Sequelize.STRING,
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
    tableName: 'tickets',
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

  Ticket.associate = function (models) {

  }

  return Ticket
}