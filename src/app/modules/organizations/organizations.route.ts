import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { OrganizationControllers } from "./organizations.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";

const router = express.Router();

router.post("/add-organization", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), OrganizationControllers.addOrganization);

router.get("/", OrganizationControllers.getAllOrganizations);
router.get("/:orgId", OrganizationControllers.getSingleOrganizationById);

router.put("/:orgId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), OrganizationControllers.updateOrganization);

router.delete("/:orgId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), OrganizationControllers.deleteOrganization);

export const OrganizationRoutes = router;