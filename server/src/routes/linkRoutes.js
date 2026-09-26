import express from "express";
import {
  createLink,
  getMyLinks,
  updateLink,
  deleteLink,
  reorderLinks,
} from "../controllers/linkController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import {
  createLinkSchema,
  updateLinkSchema,
  reorderLinksSchema,
} from "../validators/linkValidator.js";

const router = express.Router();

router.use(protect);

router.route("/").post(validate(createLinkSchema), createLink).get(getMyLinks);

router.put("/reorder", validate(reorderLinksSchema), reorderLinks);

router
  .route("/:id")
  .put(validate(updateLinkSchema), updateLink)
  .delete(deleteLink);

export default router;
