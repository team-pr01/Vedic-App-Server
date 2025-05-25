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
const router = express_1.default.Router();
// For admin only
router.post("/add-yoga", (0, auth_1.default)(auth_constannts_1.UserRole.admin), yoga_controller_1.YogaControllers.addYoga);
router.get("/", yoga_controller_1.YogaControllers.getAllYogas);
router.get("/:yogaId", yoga_controller_1.YogaControllers.getSingleYogaById);
router.put("/:yogaId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), yoga_controller_1.YogaControllers.updateYoga);
router.delete("/:yogaId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), yoga_controller_1.YogaControllers.deleteYoga);
exports.YogaRoutes = router;
