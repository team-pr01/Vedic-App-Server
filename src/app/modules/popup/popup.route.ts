import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { PopupControllers } from "./popup.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/add-popup",
  multerUpload.single("file"),
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  PopupControllers.createPopup
);

router.get("/", PopupControllers.getAllPopups);
router.get("/:popupId", PopupControllers.getPopupById);

router.put(
  "/:popupId",
  multerUpload.single("file"),
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  PopupControllers.updatePopup
);

router.delete(
  "/:popupId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  PopupControllers.deletePopup
);

export const PopupRoutes = router;
