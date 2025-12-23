import pool from "../config/db.js";

// lista conversões do usuário
export const list = async (req, res) => {
  try {
    const userId = req.user.id;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT id, file_name, midi_path, created_at FROM conversions WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    connection.release();

    res.json(rows);

  } catch (error) {
    console.error("Erro ao listar conversões:", error);
    res.status(500).json({ error: "Erro ao buscar conversões" });
  }
};

// registra uma nova conversão
export const create = async (req, res) => {
  try {
    const userId = req.user.id;
    const { file_name, midi_path } = req.body;

    if (!file_name || !midi_path) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    // TODO: implementar upload real de arquivo depois
    const connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO conversions (user_id, file_name, midi_path) VALUES (?, ?, ?)",
      [userId, file_name, midi_path]
    );
    connection.release();

    res.json({ message: "Conversão registrada com sucesso" });

  } catch (error) {
    console.error("Erro ao inserir conversão:", error);
    res.status(500).json({ error: "Erro ao registrar conversão" });
  }
};
