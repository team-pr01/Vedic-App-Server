import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { ReligiousTextControllers } from "./religiousTexts.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";

const router = express.Router();

// Create a new religious text entry (admin only)
router.post("/add", auth('admin', 'moderator'), authorizeRoute(), ReligiousTextControllers.createReligiousText);

// Get all religious texts (with optional filters)
router.get("/", ReligiousTextControllers.getAllReligiousTexts);

// Get a single religious text by ID
router.get("/:id", ReligiousTextControllers.getReligiousTextById);

// Update a religious text by ID (admin only)
router.put("/:id", auth(UserRole.admin), ReligiousTextControllers.updateReligiousText);

// Delete a religious text by ID (admin only)
router.delete("/:id", auth(UserRole.admin), ReligiousTextControllers.deleteReligiousText);

export const ReligiousTextRoutes = router;
