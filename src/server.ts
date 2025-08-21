import http from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import { cleanupExpiredNotifications } from "./app/utils/cleanupExpiredNotifications";

let server: Server;
export let io: SocketIOServer;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    server = http.createServer(app);

    // Enhanced CORS configuration
    io = new SocketIOServer(server, {
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
    io.on("connection", (socket) => {
      console.log(
        "Socket connected:",
        socket.id,
        socket.handshake.headers.origin
      );

      socket.on("error", (err) => {
        console.error("Socket error:", err);
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", socket.id, reason);
      });
    });

    server.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
      console.log(`Socket.IO available at ws://localhost:${config.port}`);
    });

    // Additional debug info
    io.engine.on("connection_error", (err) => {
      console.error("Socket.IO connection error:", err);
    });
  } catch (err) {
    console.error("Server startup error:", err);
  }
}

main();

cleanupExpiredNotifications();

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection at:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});