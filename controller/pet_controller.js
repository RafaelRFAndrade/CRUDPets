const Pet = require("../models/pet_model");
const PetAltura = require("../models/pet_altura_model");

exports.getPet = async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.send(pets);
  } catch (e) {
    console.log("Erro ao buscar tabela", e);
    res.status(500).send("Erro ao buscar tabela de pets");
  }
};

exports.createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    res.json({
      message: "Registro inserido com sucesso",
      pet
    });
  } catch (e) {
    console.log("Erro ao inserir", e);
    res.status(500).send("Erro ao inserir registro de pet");
  }
};

exports.updatePet = async (req, res) => {
  try {
    const { cod } = req.params;

    await Pet.update(req.body, {
      where: {
        cod_pet: cod
      }
    });

    res.json({
      message: "Pet " + cod + " foi atualizado"
    });
  } catch (e) {
    console.log("Erro no UPDATE", e);
    res.status(500).send("Erro ao atualizar pet");
  }
};

exports.deletePet = async (req, res) => {
  try {
    const { cod } = req.params;

    await Pet.destroy({
      where: {
        cod_pet: cod
      }
    });

    await PetAltura.destroy({
      where: {
        cod_pet: cod
      }
    });

    res.json({
      message: "Pet " + cod + " foi deletado"
    });
  } catch (e) {
    console.log("Não foi possível excluir", e);
    res.status(500).send("Não foi possível excluir o pet");
  }
};
