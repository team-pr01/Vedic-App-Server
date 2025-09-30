import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { VastuTipsControllers } from "./vastuTips.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

// For admin/moderator/super-admin only
router.post(
  "/add",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  multerUpload.single("file"),
  VastuTipsControllers.addVastuTip
);

router.get("/", VastuTipsControllers.getAllVastuTips);
router.get("/:vastuTipId", VastuTipsControllers.getSingleVastuTipById);

router.put(
  "/update/:vastuTipId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  multerUpload.single("file"),
  VastuTipsControllers.updateVastuTip
);

router.delete(
  "/delete/:vastuTipId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  VastuTipsControllers.deleteVastuTip
);

export const VastuTipsRoutes = router;
