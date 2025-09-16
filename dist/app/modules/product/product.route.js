"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const multer_config_1 = require("../../config/multer.config");
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// Add Product
router.post("/add", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), multer_config_1.multerUpload.single("file"), product_controller_1.ProductControllers.addProduct);
// Get all Products (with optional search and category filter)
router.get("/", product_controller_1.ProductControllers.getAllProducts);
// Get single Product by id
router.get("/:productId", product_controller_1.ProductControllers.getSingleProductById);
// Update Product
router.put("/update/:productId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), multer_config_1.multerUpload.single("file"), product_controller_1.ProductControllers.updateProduct);
// Update Product
router.put("/update-click/:productId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), product_controller_1.ProductControllers.updateProductClick);
// Delete Product
router.delete("/delete/:productId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
