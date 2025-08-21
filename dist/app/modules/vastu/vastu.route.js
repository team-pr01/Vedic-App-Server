"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VastuRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const vastu_controller_1 = require("./vastu.controller");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const router = express_1.default.Router();
// For admin only
router.post("/add-vastu", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), vastu_controller_1.VastuControllers.addVastu);
router.get("/", vastu_controller_1.VastuControllers.getAllVastus);
router.get("/:vastuId", vastu_controller_1.VastuControllers.getSingleVastuById);
router.put("/:vastuId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), vastu_controller_1.VastuControllers.updateVastu);
router.delete("/:vastuId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), vastu_controller_1.VastuControllers.deleteVastu);
exports.VastuRoutes = router;
