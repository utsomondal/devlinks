import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  uploadProfilePicture,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { updateProfileSchema } from "../validators/userValidator.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);

router
  .route("/me")
  .get(getMyProfile)
  .put(validate(updateProfileSchema), updateMyProfile);

router.put("/me/avatar", upload.single("avatar"), uploadProfilePicture);

export default router;