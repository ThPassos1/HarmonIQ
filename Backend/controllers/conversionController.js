import pool from "../config/db.js";

// -----------------------------------
// GET /conversions  → lista conversões
// -----------------------------------
export const list = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query(
      "SELECT id, file_name, midi_path, created_at FROM conversions WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    res.json(rows);

  } catch (error) {
    console.error("Erro ao listar conversões:", error);
    res.status(500).json({ error: "Erro ao buscar conversões" });
  }
};

// ---------------------------------------------------
// POST /conversions  → registra uma nova conversão
// ---------------------------------------------------
export const create = async (req, res) => {
  try {
    const userId = req.user.id;
    const { file_name, midi_path } = req.body;

    if (!file_name || !midi_path) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    await pool.query(
      "INSERT INTO conversions (user_id, file_name, midi_path) VALUES (?, ?, ?)",
      [userId, file_name, midi_path]
    );

    res.json({ message: "Conversão registrada com sucesso" });

  } catch (error) {
    console.error("Erro ao inserir conversão:", error);
    res.status(500).json({ error: "Erro ao registrar conversão" });
  }
};
