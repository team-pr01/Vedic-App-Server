import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { ContentController } from "./content.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";

const router = express.Router();

router.post("/create-content", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), ContentController.createContent);
router.get("/", ContentController.getAllContents);
router.get("/:contentId", ContentController.getSingleContent);
router.put("/:contentId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), ContentController.updateContent);
router.delete(
  '/delete-content/:contentId/:type/:url',
  ContentController.deleteContent
);


export const ContentRoutes = router;