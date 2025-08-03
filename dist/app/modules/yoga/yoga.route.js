"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YogaRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const yoga_controller_1 = require("./yoga.controller");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const router = express_1.default.Router();
router.get("/admin-stats", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), 
//   authorizeRoute(),
yoga_controller_1.YogaControllers.getStats);
// For admin only
router.post("/add-yoga", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), yoga_controller_1.YogaControllers.addYoga);
router.get("/", yoga_controller_1.YogaControllers.getAllYogas);
router.get("/:yogaId", yoga_controller_1.YogaControllers.getSingleYogaById);
router.put("/:yogaId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), yoga_controller_1.YogaControllers.updateYoga);
router.delete("/:yogaId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), yoga_controller_1.YogaControllers.deleteYoga);
exports.YogaRoutes = router;
