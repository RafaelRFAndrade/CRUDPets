const Sequelize = require("sequelize");
const db = require("../config/database");

const { DataTypes } = Sequelize;

const Pet = db.define('pet', {
  cod_pet: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nome_pet: {
    type: Sequelize.STRING(50)
  },
  genero_pet: {
    type: Sequelize.STRING(50)
  },
  cpf: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tutor',
      key: 'cpf'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Pet;
