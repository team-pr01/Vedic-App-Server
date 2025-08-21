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
exports.io = void 0;
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const cleanupExpiredNotifications_1 = require("./app/utils/cleanupExpiredNotifications");
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.db_url);
            server = http_1.default.createServer(app_1.default);
            // Enhanced CORS configuration
            exports.io = new socket_io_1.Server(server, {
                cors: {
                    origin: [
                        "http://localhost:5173", // Your local frontend
                        "http://192.168.0.102:5000", // Your local network IP
                        "http://localhost:19000", // React Native default
                        "http://localhost:19006", // Common React Native port
                        "http://192.168.0.102:19000", // Your local network IP
                        "http://192.168.0.102:19006",
                    ],
                    methods: ["GET", "POST", "PUT", "DELETE"],
                    allowedHeaders: ["Content-Type", "Authorization"],
                    credentials: true,
                },
                pingInterval: 25000, // default 25000ms
                pingTimeout: 60000, // increase from default 5000ms to 60000ms
                transports: ["websocket", "polling"], // Explicitly set transports
            });
            // Connection handling with error logging
            exports.io.on("connection", (socket) => {
                console.log("Socket connected:", socket.id, socket.handshake.headers.origin);
                socket.on("error", (err) => {
                    console.error("Socket error:", err);
                });
                socket.on("disconnect", (reason) => {
                    console.log("Socket disconnected:", socket.id, reason);
                });
            });
            server.listen(config_1.default.port, () => {
                console.log(`Server running on port ${config_1.default.port}`);
                console.log(`Socket.IO available at ws://localhost:${config_1.default.port}`);
            });
            // Additional debug info
            exports.io.engine.on("connection_error", (err) => {
                console.error("Socket.IO connection error:", err);
            });
        }
        catch (err) {
            console.error("Server startup error:", err);
        }
    });
}
main();
(0, cleanupExpiredNotifications_1.cleanupExpiredNotifications)();
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection at:", reason);
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
