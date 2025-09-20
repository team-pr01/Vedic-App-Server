import express from "express";
import { DonationController } from "./donation.controller";
import { multerUpload } from "../../config/multer.config";
import auth from "../../middlewares/auth";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { UserRole } from "../auth/auth.constannts";

const router = express.Router();

router.post(
  "/donate",
  multerUpload.single("file"),
  auth(
    UserRole.admin,
    UserRole.moderator,
    UserRole["super-admin"],
    UserRole.user
  ),
  authorizeRoute(),
  DonationController.donate
);
router.get(
  "/",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  DonationController.getAllDonations
);
router.get(
  "/:donationId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  DonationController.getSingleDonation
);
router.delete(
  "/:donationId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  DonationController.deleteDonation
);

export const DonationRoutes = router;
