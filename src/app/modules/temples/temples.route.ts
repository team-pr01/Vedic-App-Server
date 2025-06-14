import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { TempleControllers } from "./temples.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";

const router = express.Router();

// For admin only
router.post("/add-temple", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), TempleControllers.addTemple);
// temples.routes.ts (or in your main router config)
router.post("/:templeId/events", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), TempleControllers.addEventToTemple);
router.delete("/:templeId/events/:eventId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), TempleControllers.deleteEventFromTemple);


router.get("/", TempleControllers.getAllTemples);
router.get("/:templeId", TempleControllers.getSingleTempleById);

router.put("/:templeId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), TempleControllers.updateTemple);

router.delete("/:templeId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), TempleControllers.deleteTemple);

export const TempleRoutes = router;