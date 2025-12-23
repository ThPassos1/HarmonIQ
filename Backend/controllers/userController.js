import pool from "../config/db.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT id, name, email, credits, created_at FROM users WHERE id = ?",
      [userId]
    );
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(rows[0]);

  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).json({ error: "Erro ao buscar perfil" });
  }
};

export const getCredits = async (req, res) => {
  try {
    const userId = req.user.id;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT credits FROM users WHERE id = ?",
      [userId]
    );
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ credits: rows[0].credits });

  } catch (error) {
    console.error("Erro ao buscar créditos:", error);
    res.status(500).json({ error: "Erro ao buscar créditos" });
  }
};

export const decreaseCredits = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount = 1 } = req.body;

    const connection = await pool.getConnection();

    // verificar créditos atuais
    const [rows] = await connection.execute(
      "SELECT credits FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const credits = rows[0].credits;

    if (credits < amount) {
      connection.release();
      return res.status(400).json({ error: "Créditos insuficientes" });
    }

    // decrementar créditos
    await connection.execute(
      "UPDATE users SET credits = credits - ? WHERE id = ?",
      [amount, userId]
    );

    connection.release();

    res.json({ message: "Crédito(s) decrementado(s)", credits: credits - amount });

  } catch (error) {
    console.error("Erro ao atualizar créditos:", error);
    res.status(500).json({ error: "Erro ao atualizar créditos" });
  }
};

