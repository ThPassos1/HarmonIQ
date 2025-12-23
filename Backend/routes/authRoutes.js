// backend/routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// login do usuário
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        async (err, user) => {
            if (err) {
                console.log(err);
                return res.json({ error: "Erro interno do servidor." });
            }

            if (!user) {
                return res.json({ error: "Credenciais inválidas." });
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.json({ error: "Credenciais inválidas." });
            }

            // gera token JWT - válido por 7 dias
            // TODO: adicionar refresh token depois
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                credits: user.credits
            };

            return res.json({ token, user: userData });
        }
    );
});

// registrar novo usuário
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    // TODO: validar email format corretamente
    db.get(
        `SELECT id FROM users WHERE email = ?`,
        [email],
        async (err, row) => {
            if (row) return res.json({ error: "Email já registrado." });

            const hashedPassword = await bcrypt.hash(password, 10);

            db.run(
                `INSERT INTO users (name, email, password, credits) VALUES (?, ?, ?, 5)`,
                [name, email, hashedPassword],
                function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({ error: "Erro ao registrar." });
                    }

                    return res.json({ success: true });
                }
            );
        }
    );
});

export default router;
