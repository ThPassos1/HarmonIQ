import express from "express";
import auth from "../middleware/authMiddleware.js";
import * as conversionController from "../controllers/conversionController.js";

const router = express.Router();

router.get("/", auth, conversionController.list);
router.post("/", auth, conversionController.create);

export default router;
