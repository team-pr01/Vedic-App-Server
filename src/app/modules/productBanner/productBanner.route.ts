import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { multerUpload } from "../../config/multer.config";
import { ProductBannerControllers } from "./productBanner.controller";

const router = express.Router();

// Add Product Banner
router.post(
  "/add",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  multerUpload.single("file"),
  ProductBannerControllers.addProductBanner
);

// Get all Product Banners
router.get("/", ProductBannerControllers.getAllProductBanners);

// Get single Product Banner by ID
router.get("/:bannerId", ProductBannerControllers.getSingleProductBanner);

// Update Product Banner
router.put(
  "/update/:bannerId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  multerUpload.single("file"),
  ProductBannerControllers.updateProductBanner
);

// Delete Product Banner
router.delete(
  "/delete/:bannerId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ProductBannerControllers.deleteProductBanner
);

export const ProductBannerRoutes = router;