const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

module.exports = (req, res, next) => {
  // Pega o token do header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer TOKEN_AQUI"

  if (!token) {
    return res.status(401).json({ error: "Token inválido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Agora req.user contém { id, email }
    req.user = decoded;

    next(); // deixa continuar
  } catch (error) {
    return res.status(401).json({ error: "Token expirado ou inválido" });
  }
};
