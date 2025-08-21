import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { ReelControllers } from "./reels.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";

const router = express.Router();

// For admin only
router.post("/add-reel", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), ReelControllers.addReel);

router.get("/", ReelControllers.getAllReels);
router.get("/:reelId", ReelControllers.getSingleReelById);

router.put("/:reelId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), ReelControllers.updateReel);

router.delete("/:reelId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), ReelControllers.deleteReel);

export const ReelsRoutes = router;
