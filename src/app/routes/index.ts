import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/users/users.route";
import { EmergencyRoutes } from "../modules/emergency/emergency.route";
import { ReelsRoutes } from "../modules/reels/reels.route";
import { YogaRoutes } from "../modules/yoga/yoga.route";
import { VastuRoutes } from "../modules/vastu/vastu.route";
import { TempleRoutes } from "../modules/temples/temples.route";
import { OrganizationRoutes } from "../modules/organizations/organizations.route";
import { NewsRoutes } from "../modules/news/news.route";
import { NotificationRoutes } from "../modules/notification/notification.route";
import { PopupRoutes } from "../modules/popup/popup.route";
import { ContentRoutes } from "../modules/content/content.route";
import { ReligiousTextRoutes } from "../modules/religiousTexts/religiousTexts.route";
import { BookRoutes } from "../modules/religiousTextsNew/book/book.route";
import { ChapterRoutes } from "../modules/religiousTextsNew/chapter/chapter.route";
import { SlokOrMantraRoutes } from "../modules/religiousTextsNew/slokOrMantra/slokOrMantra.route";
import { ReelCategoryRoutes } from "../modules/categories/reelCategory/reelCategory.route";
import { VastuCategoryRoutes } from "../modules/categories/vastuCategory/vastuCategory.route";
import { ConsultancyServiceRoutes } from "../modules/consultancyService/consultancyService.route";

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
  {
    path: "/news",
    route: NewsRoutes,
  },
  {
    path: "/notification",
    route: NotificationRoutes,
  },
  {
    path: "/popup",
    route: PopupRoutes,
  },
  {
    path: "/content",
    route: ContentRoutes,
  },
  {
    path: "/religiousTexts",
    route: ReligiousTextRoutes,
  },
  {
    path: "/book",
    route: BookRoutes,
  },
  {
    path: "/chapter",
    route: ChapterRoutes,
  },
  {
    path: "/slokOrMantra",
    route: SlokOrMantraRoutes,
  },
  {
    path: "/reelCategory",
    route: ReelCategoryRoutes,
  },
  {
    path: "/vastuCategory",
    route: VastuCategoryRoutes,
  },
  {
    path: "/consultancyService",
    route: ConsultancyServiceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
