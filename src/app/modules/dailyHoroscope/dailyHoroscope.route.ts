import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { DailyHoroscopeControllers } from "./dailyHoroscope.controller";

const router = express.Router();

// Add Daily Horoscope
router.post(
  "/add",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  DailyHoroscopeControllers.addDailyHoroscope
);

// Get all Daily Horoscopes
router.get("/", DailyHoroscopeControllers.getAllDailyHoroscopes);

// Get single Daily Horoscope by ID
router.get("/:horoscopeId", DailyHoroscopeControllers.getSingleDailyHoroscopeById);

// Update Daily Horoscope
router.put(
  "/update/:horoscopeId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  DailyHoroscopeControllers.updateDailyHoroscope
);

// Delete Daily Horoscope
router.delete(
  "/delete/:horoscopeId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  DailyHoroscopeControllers.deleteDailyHoroscope
);

export const DailyHoroscopeRoutes = router;
