import express from "express";
import auth from "../middleware/authMiddleware.js";
import * as conversionController from "../controllers/conversionController.js";

const router = express.Router();

// listar conversões do usuário
router.get("/", auth, conversionController.list);

// criar nova conversão
router.post("/", auth, conversionController.create);

export default router;

