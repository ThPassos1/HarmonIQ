import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// =============================
// 📌 Conectar ao SQLite
// =============================
export const db = await open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

// =============================
// 📌 Importar Rotas
// =============================
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import conversionRoutes from "./routes/conversionRoutes.js";

// =============================
// 📌 Usar Rotas na API
// =============================
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/conversions", conversionRoutes);

// =============================
// 🚀 Iniciar servidor
// =============================
app.listen(3001, () => {
  console.log("🔥 API rodando em http://localhost:3001");
});
