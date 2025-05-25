import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { OrganizationControllers } from "./organizations.controller";

const router = express.Router();

router.post("/add-organization", auth(UserRole.admin), OrganizationControllers.addOrganization);

router.get("/", OrganizationControllers.getAllOrganizations);
router.get("/:orgId", OrganizationControllers.getSingleOrganizationById);

router.put("/:orgId", auth(UserRole.admin), OrganizationControllers.updateOrganization);

router.delete("/:orgId", auth(UserRole.admin), OrganizationControllers.deleteOrganization);

export const OrganizationRoutes = router;