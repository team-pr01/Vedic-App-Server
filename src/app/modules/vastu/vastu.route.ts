import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { VastuControllers } from "./vastu.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";

const router = express.Router();

// For admin only
router.post("/add-vastu", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), VastuControllers.addVastu);

router.get("/", VastuControllers.getAllVastus);
router.get("/:vastuId", VastuControllers.getSingleVastuById);

router.put("/:vastuId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), VastuControllers.updateVastu);

router.delete("/:vastuId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), VastuControllers.deleteVastu);

export const VastuRoutes = router;