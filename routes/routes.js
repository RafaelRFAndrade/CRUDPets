const express = require("express");
const { getTutor, createTutor, updateTutor, deleteTutor, getPetsPeloTutorCPF } = require("../controller/tutor_controller.js");
const { getPet, createPet, updatePet, deletePet } = require("../controller/pet_controller.js");
const { getPetAltura, updatePetAltura, deletePetAltura, createPetAltura, getPetsPelaAlturaCategoria } = require("../controller/pet_altura_controller.js");
const { login } = require('../controller/auth.js');
const jwt = require('jsonwebtoken');

const routes = express.Router();

// Rotas para as operações de tutor
routes.get('/tutor', getTutor);
routes.post('/tutor', createTutor);
routes.put('/tutor/:cpf', updateTutor);
routes.delete('/tutor/:cpf', deleteTutor);
routes.get('/tutor/:cpf/pets', getPetsPeloTutorCPF);

// Rotas para as operações de pet
routes.get('/pet', getPet);
routes.post('/pet', createPet);
routes.put('/pet/:cod', updatePet);
routes.delete('/pet/:cod', deletePet);

// Rotas para as operações de petAltura
routes.get('/petAltura', getPetAltura); 
routes.post('/petAltura', createPetAltura);
routes.put('/petAltura/:cod_pet', updatePetAltura);
routes.delete('/petAltura/:cod', deletePetAltura);
routes.get('/petAltura/categoria/:categoria', getPetsPelaAlturaCategoria);

// Rota de login
routes.post('/login', login);

// Middleware para traduzir o token JWT
function translateToken(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      const token = req.headers.authorization.slice(7);
  
      try {
        const decodedToken = jwt.verify(token, '123456');
        req.user = decodedToken;
      } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
      }
    }
  
    next();
  }
  
// Rota de teste do token JWT
routes.get('/traducao-token', translateToken, (req, res) => {
    // Verificar se o usuário está autenticado
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
  
    // Enviar a tradução do token JWT com o usuário como resposta
    res.json({ user: req.user });
  });

module.exports = routes;
