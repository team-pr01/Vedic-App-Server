"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const content_controller_1 = require("./content.controller");
const router = express_1.default.Router();
router.post("/create-content", (0, auth_1.default)(auth_constannts_1.UserRole.admin), content_controller_1.ContentController.createContent);
router.get("/", content_controller_1.ContentController.getAllContents);
router.get("/:contentId", content_controller_1.ContentController.getSingleContent);
router.put("/:contentId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), content_controller_1.ContentController.updateContent);
router.delete("/:contentId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), content_controller_1.ContentController.deleteContent);
exports.ContentRoutes = router;
