import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// testar conexão com MySQL
pool.getConnection().then((connection) => {
  console.log("✅ Conectado ao MySQL");
  connection.release();
}).catch((err) => {
  console.error("❌ Erro ao conectar ao MySQL:", err.message);
});

// importar rotas
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import conversionRoutes from "./routes/conversionRoutes.js";

// usar rotas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/conversions", conversionRoutes);

// iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔥 API rodando em http://localhost:${PORT}`);
});

export { pool };

