const pool = require("../config/db");

module.exports = {
  // ---------------------
  // GET /user/profile
  // ---------------------
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;

      const [rows] = await pool.query(
        "SELECT id, name, email, credits, created_at FROM users WHERE id = ?",
        [userId]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.json(rows[0]);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar perfil" });
    }
  },

  // ---------------------
  // GET /user/credits
  // ---------------------
  getCredits: async (req, res) => {
    try {
      const userId = req.user.id;

      const [rows] = await pool.query(
        "SELECT credits FROM users WHERE id = ?",
        [userId]
      );

      res.json({ credits: rows[0].credits });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar créditos" });
    }
  },

  // ---------------------
  // POST /user/credits/decrease
  // ---------------------
  decreaseCredits: async (req, res) => {
    try {
      const userId = req.user.id;

      const [rows] = await pool.query(
        "SELECT credits FROM users WHERE id = ?",
        [userId]
      );

      const credits = rows[0].credits;

      if (credits <= 0) {
        return res.status(400).json({ error: "Créditos insuficientes" });
      }

      await pool.query(
        "UPDATE users SET credits = credits - 1 WHERE id = ?",
        [userId]
      );

      res.json({ message: "Crédito decrementado" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar créditos" });
    }
  }
};
