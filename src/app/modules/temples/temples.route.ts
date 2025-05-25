import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { TempleControllers } from "./temples.controller";

const router = express.Router();

// For admin only
router.post("/add-temple", auth(UserRole.admin), TempleControllers.addTemple);

router.get("/", TempleControllers.getAllTemples);
router.get("/:templeId", TempleControllers.getSingleTempleById);

router.put("/:templeId", auth(UserRole.admin), TempleControllers.updateTemple);

router.delete("/:templeId", auth(UserRole.admin), TempleControllers.deleteTemple);

export const TempleRoutes = router;