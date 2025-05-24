import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/users/users.route";
import { EmergencyRoutes } from "../modules/emergency/emergency.route";
import { ReelsRoutes } from "../modules/reels/reels.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/emergency",
    route: EmergencyRoutes,
  },
  {
    path: "/reels",
    route: ReelsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
