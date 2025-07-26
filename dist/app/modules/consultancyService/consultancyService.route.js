"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultancyServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const consultancyService_controller_1 = require("./consultancyService.controller");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
// For admin only
router.post("/add-consultancy-service", multer_config_1.multerUpload.single("file"), (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), consultancyService_controller_1.ConsultancyServiceControllers.addConsultancyService);
router.get("/", consultancyService_controller_1.ConsultancyServiceControllers.getAllConsultancyServices);
router.get("/:consultancyServiceId", consultancyService_controller_1.ConsultancyServiceControllers.getSingleConsultancyServiceById);
router.put("/:consultancyServiceId", multer_config_1.multerUpload.single("file"), (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), consultancyService_controller_1.ConsultancyServiceControllers.updateConsultancyService);
router.delete("/:consultancyServiceId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), consultancyService_controller_1.ConsultancyServiceControllers.deleteConsultancyService);
exports.ConsultancyServiceRoutes = router;
