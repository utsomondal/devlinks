import express from "express";
import { getMyProfile, updateMyProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/me").get(getMyProfile).put(updateMyProfile);

export default router;