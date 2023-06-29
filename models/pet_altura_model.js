const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Pet = require('./pet_model');

const PetAltura = db.define('altura_pet', {
  cod_pet: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Pet,
      key: 'cod_pet'
    }
  },
  altura: {
    type: DataTypes.STRING(50)
  }
}, {
  timestamps: false,
  freezeTableName: true
});
PetAltura.belongsTo(Pet, { foreignKey: 'cod_pet', targetKey: 'cod_pet' });
module.exports = PetAltura;
