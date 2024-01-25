module.exports = function (sequelize, DataTypes) {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "CountryId".'
      }
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "CityId".'
      }
    },
    dialCodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "DialCodeId".'
      }
    },
    fiscalName: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "FiscalName".'
      }
    },
    comercialName: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "ComercialName".'
      }
    },
    vat: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Vat".'
      }
    },
    comercialAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fiscalAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "FiscalAddress".'
      }
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "PostalCode".'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      notNull: {
        msg: 'Por favor, rellena el campo "Email".'
      }
    },
    web: {
      type: DataTypes.STRING
    },
    telephone: {
      type: DataTypes.STRING
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
    tableName: 'companies',
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
        name: 'companies_countryId_fk',
        using: 'BTREE',
        fields: [
          { name: 'countryId' }
        ]
      },
      {
        name: 'companies_cityId_fk',
        using: 'BTREE',
        fields: [
          { name: 'cityId' }
        ]
      },
      {
        name: 'companies_dialCodeId_fk',
        using: 'BTREE',
        fields: [
          { name: 'dialCodeId' }
        ]
      },
    ]
  })

  Company.associate = function (models) {
    Company.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId' })
    Company.belongsTo(models.City, { as: 'city', foreignKey: 'cityId' })
    Company.belongsTo(models.DialCode, { as: 'dialCode', foreignKey: 'dialCodeId' })
  }

  return Company
}