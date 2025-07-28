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
            // Step 2: Create HTTP server from app
            server = http_1.default.createServer(app_1.default);
            // Step 3: Initialize Socket.IO with CORS settings
            exports.io = new socket_io_1.Server(server, {
                cors: {
                    origin: 'http://localhost:5173', // your frontend domain
                    methods: ['GET', 'POST'],
                    credentials: true,
                },
            });
            // Step 4: Handle connection event
            exports.io.on('connection', (socket) => {
                console.log('Socket connected:', socket.id);
                socket.on('disconnect', () => {
                    console.log('Socket disconnected:', socket.id);
                });
            });
            // Start listening
            server.listen(config_1.default.port, () => {
                console.log(`App listening on port ${config_1.default.port}`);
            });
        }
        catch (err) {
            console.error(err);
        }
    });
}
main();
// Step 5: Start scheduled job (optional, if needed)
(0, cleanupExpiredNotifications_1.cleanupExpiredNotifications)();
// Error handling
process.on('unhandledRejection', () => {
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on('uncaughtException', () => {
    process.exit(1);
});
