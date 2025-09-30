"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VastuTipsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const vastuTips_controller_1 = require("./vastuTips.controller");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
// For admin/moderator/super-admin only
router.post("/add", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), multer_config_1.multerUpload.single("file"), vastuTips_controller_1.VastuTipsControllers.addVastuTip);
router.get("/", vastuTips_controller_1.VastuTipsControllers.getAllVastuTips);
router.get("/:vastuTipId", vastuTips_controller_1.VastuTipsControllers.getSingleVastuTipById);
router.put("/update/:vastuTipId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), multer_config_1.multerUpload.single("file"), vastuTips_controller_1.VastuTipsControllers.updateVastuTip);
router.delete("/delete/:vastuTipId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), vastuTips_controller_1.VastuTipsControllers.deleteVastuTip);
exports.VastuTipsRoutes = router;
