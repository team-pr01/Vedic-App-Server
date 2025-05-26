import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { TempleControllers } from "./temples.controller";

const router = express.Router();

// For admin only
router.post("/add-temple", auth(UserRole.admin), TempleControllers.addTemple);
// temples.routes.ts (or in your main router config)
router.post("/:templeId/events", auth(UserRole.admin), TempleControllers.addEventToTemple);
router.delete("/:templeId/events/:eventId", auth(UserRole.admin), TempleControllers.deleteEventFromTemple);


router.get("/", TempleControllers.getAllTemples);
router.get("/:templeId", TempleControllers.getSingleTempleById);

router.put("/:templeId", auth(UserRole.admin), TempleControllers.updateTemple);

router.delete("/:templeId", auth(UserRole.admin), TempleControllers.deleteTemple);

export const TempleRoutes = router;