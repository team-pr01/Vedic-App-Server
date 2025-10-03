"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyHoroscopeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const dailyHoroscope_controller_1 = require("./dailyHoroscope.controller");
const router = express_1.default.Router();
// Add Daily Horoscope
router.post("/add", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), dailyHoroscope_controller_1.DailyHoroscopeControllers.addDailyHoroscope);
// Get all Daily Horoscopes
router.get("/", dailyHoroscope_controller_1.DailyHoroscopeControllers.getAllDailyHoroscopes);
// Get single Daily Horoscope by ID
router.get("/:horoscopeId", dailyHoroscope_controller_1.DailyHoroscopeControllers.getSingleDailyHoroscopeById);
// Update Daily Horoscope
router.put("/update/:horoscopeId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), dailyHoroscope_controller_1.DailyHoroscopeControllers.updateDailyHoroscope);
// Delete Daily Horoscope
router.delete("/delete/:horoscopeId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), dailyHoroscope_controller_1.DailyHoroscopeControllers.deleteDailyHoroscope);
exports.DailyHoroscopeRoutes = router;
