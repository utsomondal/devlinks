import express from "express";
import {
  createLink,
  getMyLinks,
  updateLink,
  deleteLink,
} from "../controllers/linkController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // All routes after this middleware will require authentication

router.route("/").post(createLink).get(getMyLinks);
router.route("/:id").put(updateLink).delete(deleteLink);

export default router;
