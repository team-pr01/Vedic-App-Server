"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const users_route_1 = require("../modules/users/users.route");
const emergency_route_1 = require("../modules/emergency/emergency.route");
const reels_route_1 = require("../modules/reels/reels.route");
const yoga_route_1 = require("../modules/yoga/yoga.route");
const vastu_route_1 = require("../modules/vastu/vastu.route");
const temples_route_1 = require("../modules/temples/temples.route");
const organizations_route_1 = require("../modules/organizations/organizations.route");
const news_route_1 = require("../modules/news/news.route");
const notification_route_1 = require("../modules/notification/notification.route");
const popup_route_1 = require("../modules/popup/popup.route");
const content_route_1 = require("../modules/content/content.route");
const religiousTexts_route_1 = require("../modules/religiousTexts/religiousTexts.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: users_route_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoute,
    },
    {
        path: "/emergency",
        route: emergency_route_1.EmergencyRoutes,
    },
    {
        path: "/reels",
        route: reels_route_1.ReelsRoutes,
    },
    {
        path: "/yoga",
        route: yoga_route_1.YogaRoutes,
    },
    {
        path: "/vastu",
        route: vastu_route_1.VastuRoutes,
    },
    {
        path: "/temple",
        route: temples_route_1.TempleRoutes,
    },
    {
        path: "/organization",
        route: organizations_route_1.OrganizationRoutes,
    },
    {
        path: "/news",
        route: news_route_1.NewsRoutes,
    },
    {
        path: "/notification",
        route: notification_route_1.NotificationRoutes,
    },
    {
        path: "/popup",
        route: popup_route_1.PopupRoutes,
    },
    {
        path: "/content",
        route: content_route_1.ContentRoutes,
    },
    {
        path: "/religiousTexts",
        route: religiousTexts_route_1.ReligiousTextRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
