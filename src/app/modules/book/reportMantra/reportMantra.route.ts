import express from "express";
import auth from "../../../middlewares/auth";
import { UserRole } from "../../auth/auth.constannts";
import { ReportMantraController } from "./reportMantra.controller";
import authorizeRoute from "../../../middlewares/authorizeRoute";

const router = express.Router();

router.post("/report", ReportMantraController.reportMantra);

router.get(
  "/",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ReportMantraController.getAllReportedMantras
);

router.get(
  "/:reportId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ReportMantraController.getSingleReportedMantra
);

router.put(
  "/update-status/:reportId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ReportMantraController.updateReportStatus
);

export const ReportMantraRoutes = router;
