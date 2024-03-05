module.exports = function (sequelize, DataTypes) {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    fingerprintId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Name".'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Email".'
      }
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Subject".'
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Message".'
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
    tableName: 'contacts',
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
        name: 'contacts_fingerprintId_fk',
        using: 'BTREE',
        fields: [
          { name: 'fingerprintId' }
        ]
      },
      {
        name: 'contacts_email_index',
        using: 'BTREE',
        unique: true,
        fields: [
          { name: 'email' }
        ]
      },
    ]
  })

  Contact.associate = function (models) {
    Contact.belongsTo(models.Fingerprint, { as: 'fingerprint', foreignKey: 'fingerprintId' })
  }

  return Contact
}