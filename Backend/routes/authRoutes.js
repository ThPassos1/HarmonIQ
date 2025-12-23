// backend/routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// --------------------------------------
// 🔐 LOGIN
// --------------------------------------
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

            // Gerar token JWT
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

// --------------------------------------
// 📝 REGISTRO
// --------------------------------------
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

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
