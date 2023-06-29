const Tutor = require("../models/tutor_model");
const Pet = require("../models/pet_model");

exports.getTutor = async (req, res) => {
  try {
    const tutors = await Tutor.findAll();
    res.send(tutors);
  } catch (e) {
    console.log("Erro ao buscar tabela", e);
    res.status(500).send("Erro ao buscar tabela de tutores");
  }
};

exports.createTutor = async (req, res) => {
  try {
    await Tutor.create(req.body);
    res.json({
      message: "Registro inserido com sucesso"
    });
  } catch (e) {
    console.log("Erro ao inserir", e);
    res.status(500).send("Erro ao inserir registro de tutor");
  }
};

exports.updateTutor = async (req, res) => {
  try {
    const { cpf } = req.params;

    await Tutor.update(req.body, {
      where: {
        cpf
      }
    });

    res.json({
      message: "Tutor " + cpf + " foi atualizado"
    });
  } catch (e) {
    console.log("Erro no UPDATE", e);
    res.status(500).send("Erro ao atualizar tutor");
  }
};

exports.deleteTutor = async (req, res) => {
  try {
    const { cpf } = req.params;

    await Tutor.destroy({
      where: {
        cpf
      }
    });

    res.json({
      message: "Tutor " + cpf + " foi deletado"
    });
  } catch (e) {
    console.log("Não foi possível excluir", e);
    res.status(500).send("Não foi possível excluir o tutor");
  }
};

exports.getPetsPeloTutorCPF = async (req, res) => {
    try {
       const { cpf } = req.params;
 
       const pets = await Pet.findAll({
          where: {
             cpf
          }
       });
 
       res.send(pets);
    } catch (e) {
       console.log("Erro ao buscar pets por CPF do tutor", e);
    }
 };