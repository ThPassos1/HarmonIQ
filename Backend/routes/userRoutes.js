import express from "express";
import auth from "../middleware/authMiddleware.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", auth, userController.getProfile);
router.get("/credits", auth, userController.getCredits);
router.post("/credits/decrease", auth, userController.decreaseCredits);

export default router;

