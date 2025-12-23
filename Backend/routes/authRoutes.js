// backend/routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = express.Router();

// login do usuário
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email e senha são obrigatórios." });
        }

        const connection = await pool.getConnection();
        const [rows] = await connection.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        connection.release();

        if (rows.length === 0) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        // gera token JWT - válido por 7 dias
        // TODO: adicionar refresh token depois
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "dev-secret",
            { expiresIn: "7d" }
        );

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            credits: user.credits
        };

        return res.json({ token, user: userData });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
});

// registrar novo usuário
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
        }

        // TODO: validar email format corretamente
        const connection = await pool.getConnection();

        // verificar se email já existe
        const [existingUsers] = await connection.execute(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            connection.release();
            return res.status(400).json({ error: "Email já registrado." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.execute(
            "INSERT INTO users (name, email, password_hash, credits) VALUES (?, ?, ?, 5)",
            [name, email, hashedPassword]
        );

        connection.release();

        return res.json({ success: true, message: "Usuário registrado com sucesso!" });
    } catch (error) {
        console.error("Erro no registro:", error);
        return res.status(500).json({ error: "Erro ao registrar usuário." });
    }
});

export default router;

