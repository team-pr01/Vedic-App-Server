import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { NewsControllers } from "./news.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/add-news",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  multerUpload.single("file"),
  NewsControllers.addNews
);

router.get("/", NewsControllers.getAllNews);
router.get("/:newsId", NewsControllers.getSingleNewsById);

router.put(
  "/:newsId",
  multerUpload.single("file"),
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  NewsControllers.updateNews
);
router.delete(
  "/:newsId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  NewsControllers.deleteNews
);
router.patch(
  "/like/:newsId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"], UserRole.user, UserRole.temple),
  NewsControllers.toggleLikeNewsController
);
router.patch(
  "/view/:newsId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"], UserRole.user, UserRole.temple),
  NewsControllers.viewNews
);

export const NewsRoutes = router;
