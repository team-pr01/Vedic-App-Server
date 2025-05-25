import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { YogaControllers } from "./temples.controller";

const router = express.Router();

// For admin only
router.post("/add-yoga", auth(UserRole.admin), YogaControllers.addYoga);

router.get("/", YogaControllers.getAllYogas);
router.get("/:yogaId", YogaControllers.getSingleYogaById);

router.put("/:yogaId", auth(UserRole.admin), YogaControllers.updateYoga);

router.delete("/:yogaId", auth(UserRole.admin), YogaControllers.deleteYoga);

export const YogaRoutes = router;