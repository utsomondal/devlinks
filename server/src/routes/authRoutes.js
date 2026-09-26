import express from "express";
import { register, login, guestLogin, getMe, logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { registerSchema, loginSchema, guestSchema } from "../validators/authValidator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/guest", validate(guestSchema), guestLogin);
router.get("/me", protect, getMe);
router.post("/logout", logout);

export default router;