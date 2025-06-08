import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { PopupControllers } from "./popup.controller";

const router = express.Router();

router.post("/add-popup", auth(UserRole.admin), PopupControllers.createPopup);

router.get("/", PopupControllers.getAllPopups)
router.get("/:popupId", PopupControllers.getPopupById);

router.put("/:popupId", auth(UserRole.admin), PopupControllers.updatePopup);

router.delete("/:popupId", auth(UserRole.admin), PopupControllers.deletePopup);

export const PopupRoutes = router;
