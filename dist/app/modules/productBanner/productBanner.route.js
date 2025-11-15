"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductBannerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const multer_config_1 = require("../../config/multer.config");
const productBanner_controller_1 = require("./productBanner.controller");
const router = express_1.default.Router();
// Add Product Banner
router.post("/add", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), multer_config_1.multerUpload.single("file"), productBanner_controller_1.ProductBannerControllers.addProductBanner);
// Get all Product Banners
router.get("/", productBanner_controller_1.ProductBannerControllers.getAllProductBanners);
// Get single Product Banner by ID
router.get("/:bannerId", productBanner_controller_1.ProductBannerControllers.getSingleProductBanner);
// Update Product Banner
router.put("/update/:bannerId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), multer_config_1.multerUpload.single("file"), productBanner_controller_1.ProductBannerControllers.updateProductBanner);
// Delete Product Banner
router.delete("/delete/:bannerId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), productBanner_controller_1.ProductBannerControllers.deleteProductBanner);
exports.ProductBannerRoutes = router;
