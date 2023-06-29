const Sequelize = require("sequelize");
const db = require("../config/database");

const { DataTypes } = Sequelize;

const Tutor = db.define('tutor', {
  cpf: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING(50)
  },
  email: {
    type: Sequelize.STRING(50)
  },
  senha: {
    type: Sequelize.STRING(255)
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Tutor;
