module.exports = function (sequelize, DataTypes) {
  const EmailError = sequelize.define('EmailError', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "CustomerId".'
      }
    },
    emailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "EmailId".'
      }
    },
    error: {
      type: DataTypes.TEXT,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Error".'
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
    tableName: 'email_errors',
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
        name: 'email_errors_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'email_errors_emailId_fk',
        using: 'BTREE',
        fields: [
          { name: 'emailId' }
        ]
      },
    ]
  })

  EmailError.associate = function (models) {
    EmailError.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
    EmailError.belongsTo(models.Email, { as: 'email', foreignKey: 'emailId' })
  }

  return EmailError
}