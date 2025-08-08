/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { cleanupExpiredNotifications } from "./app/utils/cleanupExpiredNotifications";

// Define extended Socket interface for TypeScript
interface UserSocket extends Socket {
  userId?: string;
}

// Global server and Socket.IO instances
let server: Server;
export let io: SocketIOServer;

// Track connected users with their socket IDs
const connectedUsers: Record<string, string> = {};

async function main() {
  try {
    // Database connection
    await mongoose.connect(config.db_url as string);

    // HTTP server setup
    server = http.createServer(app);

    // Socket.IO server configuration
    io = new SocketIOServer(server, {
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
    io.on("connection", (socket: UserSocket) => {
      console.log("Socket connected:", socket.id, socket.handshake.headers.origin);

      // Error handling
      socket.on("error", (err) => {
        console.error("Socket error:", err);
      });

      // User registration for targeted messaging
      socket.on("register-user", (userId: string) => {
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
    io.engine.on("connection_error", (err) => {
      console.error("Socket.IO connection error:", err);
    });

    // Export connectedUsers for use in other modules
    (global as any).connectedUsers = connectedUsers;

    // Start the server
    server.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
      console.log(`Socket.IO available at ws://localhost:${config.port}`);
    });

  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1);
  }
}

// Start the application
main().catch(err => {
  console.error("Application startup failed:", err);
  process.exit(1);
});

// Cleanup tasks
cleanupExpiredNotifications();

// Global error handlers
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection at:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Export the connectedUsers map for use in other modules
export { connectedUsers };