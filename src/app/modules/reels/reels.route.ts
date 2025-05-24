import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { ReelControllers } from "./reels.controller";

const router = express.Router();

// For admin only
router.post("/add-reel", auth(UserRole.admin), ReelControllers.addReel);

// router.get("/", auth(UserRole.admin), ReelControllers.getAllReels);
// router.get("/:reelId", auth(UserRole.admin), ReelControllers.getSingleReelById);

// router.put("/:emergencyId", auth(UserRole.admin), ReelControllers.updateReel);

// router.delete("/:emergencyId", auth(UserRole.admin), ReelControllers.deleteReel);

export const ReelsRoutes = router;
