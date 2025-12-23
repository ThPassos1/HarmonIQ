const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// chave secreta do JWT (padrão usa variável de ambiente)
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

module.exports = {
  // ---------------------
  // REGISTRO DE USUÁRIO
  // ---------------------
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // validação simples
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Preencha todos os campos" });
      }

      // verifica se email já existe
      const [existing] = await pool.query(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );

      if (existing.length > 0) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      // hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // insere novo usuário
      const [result] = await pool.query(
        "INSERT INTO users (name, email, password, credits) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, 5] // usuário ganha 5 créditos iniciais
      );

      return res.json({
        message: "Usuário registrado com sucesso!"
      });
    } catch (error) {
      console.error("Erro no register:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  // ---------------------
  // LOGIN DO USUÁRIO
  // ---------------------
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Informe email e senha" });
      }

      const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }

      const user = rows[0];

      // compara senha
      const validPass = await bcrypt.compare(password, user.password);

      if (!validPass) {
        return res.status(400).json({ error: "Senha incorreta" });
      }

      // gera token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Login realizado",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          credits: user.credits
        }
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};
