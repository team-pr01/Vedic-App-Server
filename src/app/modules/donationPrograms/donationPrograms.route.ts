import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { multerUpload } from "../../config/multer.config";
import { DonationProgramsController } from "./donationPrograms.controller";

const router = express.Router();

// Create a donation program
router.post(
  "/",
  multerUpload.single("file"),
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  DonationProgramsController.createDonationProgram
);

// Get all donation programs (public)
router.get("/", DonationProgramsController.getAllDonationPrograms);

// Get single donation program by ID (public)
router.get(
  "/:donationProgramId",
  DonationProgramsController.getSingleDonationProgramById
);

// Update donation program
router.put(
  "/:donationProgramId",
  multerUpload.single("file"),
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  DonationProgramsController.updateDonationProgram
);

// Delete donation program
router.delete(
  "/:donationProgramId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  DonationProgramsController.deleteDonationProgram
);

export const DonationProgramRoutes = router;
