import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import {YogaControllers } from "./yoga.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";

const router = express.Router();

router.get(
  "/admin-stats",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
//   authorizeRoute(),
  YogaControllers.getStats
);

// For admin only
router.post(
  "/add-yoga",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  YogaControllers.addYoga
);

router.get("/", YogaControllers.getAllYogas);
router.get("/:yogaId", YogaControllers.getSingleYogaById);

router.put(
  "/:yogaId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  YogaControllers.updateYoga
);

router.delete(
  "/:yogaId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  YogaControllers.deleteYoga
);

export const YogaRoutes = router;
