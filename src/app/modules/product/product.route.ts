import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { multerUpload } from "../../config/multer.config";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// Add Product
router.post(
  "/add",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  multerUpload.single("file"),
  ProductControllers.addProduct
);

// Get all Products (with optional search and category filter)
router.get("/", ProductControllers.getAllProducts);

// Get single Product by id
router.get("/:productId", ProductControllers.getSingleProductById);

// Update Product
router.put(
  "/update/:productId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  multerUpload.single("file"),
  ProductControllers.updateProduct
);

// Update Product
router.put(
  "/update-click/:productId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"], UserRole.user),
  ProductControllers.updateProductClick
);

// Delete Product
router.delete(
  "/delete/:productId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ProductControllers.deleteProduct
);

export const ProductRoutes = router;
