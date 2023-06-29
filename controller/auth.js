const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Tutor = require('../models/tutor_model');

const generateToken = (user) => {
  const token = jwt.sign(
    {
      cpf: user.cpf,
      nome: user.nome,
      email: user.email,
      senha: user.senha
    },
    '123456',
    { expiresIn: '1h' }
  );
  return token;
};

const login = async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const tutor = await Tutor.findOne({ where: { cpf, senha } });

    if (!tutor) {
      return res.status(401).json({ message: 'Usuário ou senha inválida.' });
    }

    const token = generateToken(tutor);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

module.exports = { login };
