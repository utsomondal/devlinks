import express from "express";
import { getPublicProfile, trackClick } from "../controllers/publicController.js";

const router = express.Router();

router.get("/:username", getPublicProfile);
router.post("/click/:id", trackClick);

export default router;