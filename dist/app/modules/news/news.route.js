"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const news_controller_1 = require("./news.controller");
const router = express_1.default.Router();
router.post("/add-news", (0, auth_1.default)(auth_constannts_1.UserRole.admin), news_controller_1.NewsControllers.addNews);
router.get("/", news_controller_1.NewsControllers.getAllNews);
router.get("/:newsId", news_controller_1.NewsControllers.getSingleNewsById);
router.put("/:newsId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), news_controller_1.NewsControllers.updateNews);
router.delete("/:newsId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), news_controller_1.NewsControllers.deleteNews);
exports.NewsRoutes = router;
