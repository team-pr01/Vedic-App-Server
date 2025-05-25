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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
