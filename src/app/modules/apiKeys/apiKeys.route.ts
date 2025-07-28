import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { ApiKeyControllers } from "./apiKeys.controller";

const router = express.Router();

// Add API Key (Admin/Moderator/Super Admin only)
router.post(
  "/add",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ApiKeyControllers.addApiKey
);

// Get all API Keys (Public or secure depending on use-case)
router.get("/", ApiKeyControllers.getAllApiKeys);

// Delete API Key by ID (Admin/Moderator/Super Admin only)
router.delete(
  "/:apiKeyId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ApiKeyControllers.deleteApiKey
);

export const ApiKeyRoutes = router;
