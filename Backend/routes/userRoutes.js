const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.get("/profile", auth, userController.getProfile);
router.get("/credits", auth, userController.getCredits);
router.post("/credits/decrease", auth, userController.decreaseCredits);

module.exports = router;
