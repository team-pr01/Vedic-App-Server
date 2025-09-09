import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { multerUpload } from "../../config/multer.config";
import { AyurvedaControllers } from "./ayurveda.controller";

const router = express.Router();

router.post(
  "/add",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  multerUpload.single("file"),
  AyurvedaControllers.addAyurveda
);

router.get("/", AyurvedaControllers.getAllAyurveda);
router.get("/:ayurvedaId", AyurvedaControllers.getSingleAyurvedaById);

router.put(
  "/update/:ayurvedaId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  multerUpload.single("file"),
  AyurvedaControllers.updateAyurveda
);

router.delete(
  "/delete/:ayurvedaId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  AyurvedaControllers.deleteAyurveda
);

export const AyurvedaRoutes = router;
