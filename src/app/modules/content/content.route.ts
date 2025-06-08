import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { ContentController } from "./content.controller";

const router = express.Router();

router.post("/create-content", auth(UserRole.admin), ContentController.createContent);
router.get("/", ContentController.getAllContents);
router.get("/:contentId", ContentController.getSingleContent);
router.put("/:contentId", auth(UserRole.admin), ContentController.updateContent);
router.delete("/:contentId", auth(UserRole.admin), ContentController.deleteContent);

export const ContentRoutes = router;