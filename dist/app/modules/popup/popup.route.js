"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const popup_controller_1 = require("./popup.controller");
const router = express_1.default.Router();
router.post("/add-popup", (0, auth_1.default)(auth_constannts_1.UserRole.admin), popup_controller_1.PopupControllers.createPopup);
router.get("/", popup_controller_1.PopupControllers.getAllPopups);
router.get("/:popupId", popup_controller_1.PopupControllers.getPopupById);
router.put("/:popupId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), popup_controller_1.PopupControllers.updatePopup);
router.delete("/:popupId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), popup_controller_1.PopupControllers.deletePopup);
exports.PopupRoutes = router;
