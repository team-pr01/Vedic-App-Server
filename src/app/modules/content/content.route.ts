import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { ContentController } from "./content.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/create-content",
  multerUpload.single("file"),
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ContentController.createContent
);
router.get("/", ContentController.getAllContents);
router.get("/:contentId", ContentController.getSingleContent);

router.put(
  "/:contentId",
  multerUpload.single("file"),
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ContentController.updateContent
);
router.delete(
  "/delete-content/:contentId",
  ContentController.deleteContent
);

export const ContentRoutes = router;
