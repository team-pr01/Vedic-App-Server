"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth_model_1 = require("../modules/auth/auth.model");
const routeAccessMap_constants_1 = require("../constants/routeAccessMap.constants");
const authorizeRoute = () => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to proceed!");
        }
        // Extract token
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        }
        catch (err) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid or expired token");
        }
        // Fetch user to get assignedPages and role
        const user = yield auth_model_1.User.findById(decoded.userId).select("assignedPages role");
        if (!user) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User not found");
        }
        // Attach user info to request
        req.user = decoded;
        // 👇️ Construct and normalize current route
        let currentRoute = req.baseUrl + ((_b = (_a = req.route) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : "");
        currentRoute = currentRoute
            .replace(/^\/api\/v[0-9]+/, "")
            .replace(/\/$/, "");
        // Flatten allowed backend routes from assigned frontend pages
        const allowedRoutes = user
            .assignedPages.map((frontendPath) => routeAccessMap_constants_1.routeAccessMap[frontendPath] || [])
            .flat();
        if (!allowedRoutes.includes(currentRoute)) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Access denied to this route");
        }
        next();
    }));
};
exports.default = authorizeRoute;
