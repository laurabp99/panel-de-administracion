module.exports = function (sequelize, DataTypes) {
  const Company = sequelize.define('Company', {
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
    cityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dialCodeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    fiscalName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    comercialName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    vat: {
      type: Sequelize.STRING,
      allowNull: false
    },
    comercialAddress: {
      type: Sequelize.STRING,
      allowNull: true
    },
    fiscalAddress: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postalCode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    web: {
      type: Sequelize.STRING
    },
    telephone: {
      type: Sequelize.STRING
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
      }
    ]
  })

  Company.associate = function (models) {

  }

  return Company
}