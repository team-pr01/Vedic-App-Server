import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/users/users.route";
import { EmergencyRoutes } from "../modules/emergency/emergency.route";
import { ReelsRoutes } from "../modules/reels/reels.route";
import { YogaRoutes } from "../modules/yoga/yoga.route";
import { VastuRoutes } from "../modules/vastu/vastu.route";
import { TempleRoutes } from "../modules/temples/temples.route";
import { OrganizationRoutes } from "../modules/organizations/organizations.route";

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
  {
    path: "/yoga",
    route: YogaRoutes,
  },
  {
    path: "/vastu",
    route: VastuRoutes,
  },
  {
    path: "/temple",
    route: TempleRoutes,
  },
  {
    path: "/organization",
    route: OrganizationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
