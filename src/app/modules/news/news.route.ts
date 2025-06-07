import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { NewsControllers } from "./news.controller";

const router = express.Router();

router.post("/add-news", auth(UserRole.admin), NewsControllers.addNews);

router.get("/", NewsControllers.getAllNews);
router.get("/:newsId", NewsControllers.getSingleNewsById);

router.put("/:newsId", auth(UserRole.admin), NewsControllers.updateNews);

router.delete("/:newsId", auth(UserRole.admin), NewsControllers.deleteNews);

export const NewsRoutes = router;
