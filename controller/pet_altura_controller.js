const PetAltura = require("../models/pet_altura_model");
const { Op } = require("sequelize");
const Pet = require("../models/pet_model");

exports.getPetAltura = async (req, res) => {
  try {
    const petAltura = await PetAltura.findAll();
    res.send(petAltura);
  } catch (e) {
    console.log("Erro ao buscar tabela", e);
    res.status(500).send("Erro ao buscar tabela de alturas dos pets");
  }
};

exports.createPetAltura = async (req, res) => {
    try {
       const { cod_pet } = req.body;
       const { altura } = req.body;
       let alturaCategory;
 
       if (altura <= 15) {
          alturaCategory = "Pequeno";
       } else if (altura > 15 && altura < 45) {
          alturaCategory = "Médio";
       } else {
          alturaCategory = "Alto";
       }
 
       await PetAltura.create({ cod_pet, altura: alturaCategory });
 
       res.json({
          "message": "Registro inserido com sucesso"
       });
    } catch (e) {
       console.log("Erro ao inserir", e);
    }
 }; 

exports.updatePetAltura = async (req, res) => {
    try {
       const { cod_pet } = req.params;
       const { altura } = req.body;
       let alturaCategory;
 
       if (altura <= 15) {
          alturaCategory = "Pequeno";
       } else if (altura > 15 && altura < 45) {
          alturaCategory = "Médio";
       } else {
          alturaCategory = "Alto";
       }
 
       await PetAltura.update({ altura: alturaCategory }, {
          where: {
             cod_pet
          }
       });
       res.json({
          "message": "A Altura do Pet " + cod_pet + " foi atualizada"
       });
    } catch (e) {
       console.log("Erro no UPDATE", e);
    }
 };
 

exports.deletePetAltura = async (req, res) => {
  try {
    const { cod_pet } = req.params;

    await PetAltura.destroy({
      where: {
        cod_pet
      }
    });

    res.json({
      message: "O registro de Altura do Pet " + cod_pet + " foi deletado"
    });
  } catch (e) {
    console.log("Não foi possível excluir", e);
    res.status(500).send("Não foi possível excluir a altura do pet");
  }
};

exports.getPetsPelaAlturaCategoria = async (req, res) => {
    try {
      const { categoria } = req.params;
      let altura;
  
      if (categoria === 'pequeno') {
        altura = 'Pequeno';
      } else if (categoria === 'médio') {
        altura = 'Médio';
      } else if (categoria === 'alto') {
        altura = 'Alto';
      } else {
        return res.status(400).json({ message: 'Categoria inválida' });
      }
  
      const pets = await PetAltura.findAll({
        where: { altura },
        include: [{ model: Pet }]
      });
  
      res.send(pets);
    } catch (e) {
      console.log("Erro ao buscar tabela", e);
    }
  };
  