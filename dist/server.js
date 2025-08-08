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
exports.connectedUsers = exports.io = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const cleanupExpiredNotifications_1 = require("./app/utils/cleanupExpiredNotifications");
// Global server and Socket.IO instances
let server;
// Track connected users with their socket IDs
const connectedUsers = {};
exports.connectedUsers = connectedUsers;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Database connection
            yield mongoose_1.default.connect(config_1.default.db_url);
            // HTTP server setup
            server = http_1.default.createServer(app_1.default);
            // Socket.IO server configuration
            exports.io = new socket_io_1.Server(server, {
                cors: {
                    origin: [
                        "http://localhost:5173",
                        "http://192.168.0.102:5000",
                        "http://localhost:19000",
                        "http://localhost:19006",
                        "http://192.168.0.102:19000",
                        "http://192.168.0.102:19006",
                    ],
                    methods: ["GET", "POST", "PUT", "DELETE"],
                    allowedHeaders: ["Content-Type", "Authorization"],
                    credentials: true,
                },
                pingInterval: 25000,
                pingTimeout: 60000,
                transports: ["websocket", "polling"],
            });
            // Socket.IO connection handling
            exports.io.on("connection", (socket) => {
                console.log("Socket connected:", socket.id, socket.handshake.headers.origin);
                // Error handling
                socket.on("error", (err) => {
                    console.error("Socket error:", err);
                });
                // User registration for targeted messaging
                socket.on("register-user", (userId) => {
                    if (userId) {
                        socket.userId = userId;
                        connectedUsers[userId] = socket.id;
                        console.log(`User ${userId} registered with socket ${socket.id}`);
                    }
                });
                // Clean up on disconnect
                socket.on("disconnect", (reason) => {
                    console.log("Socket disconnected:", socket.id, reason);
                    if (socket.userId) {
                        delete connectedUsers[socket.userId];
                    }
                });
            });
            // Engine-level error handling
            exports.io.engine.on("connection_error", (err) => {
                console.error("Socket.IO connection error:", err);
            });
            // Export connectedUsers for use in other modules
            global.connectedUsers = connectedUsers;
            // Start the server
            server.listen(config_1.default.port, () => {
                console.log(`Server running on port ${config_1.default.port}`);
                console.log(`Socket.IO available at ws://localhost:${config_1.default.port}`);
            });
        }
        catch (err) {
            console.error("Server startup error:", err);
            process.exit(1);
        }
    });
}
// Start the application
main().catch(err => {
    console.error("Application startup failed:", err);
    process.exit(1);
});
// Cleanup tasks
(0, cleanupExpiredNotifications_1.cleanupExpiredNotifications)();
// Global error handlers
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection at:", reason);
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
