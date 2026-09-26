import express from "express";
import {
  getStats,
  getAllUsers,
  deleteUser,
  getAllLinks,
  deleteLink,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// All admin routes need login + admin role
router.use(protect, admin);

router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/links", getAllLinks);
router.delete("/links/:id", deleteLink);

export default router;