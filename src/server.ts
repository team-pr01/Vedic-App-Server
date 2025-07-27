import http from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { cleanupExpiredNotifications } from './app/utils/cleanupExpiredNotifications';

let server: Server;

// Step 1: Declare io globally to use in other files
export let io: SocketIOServer;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    // Step 2: Create HTTP server from app
    server = http.createServer(app);

    // Step 3: Initialize Socket.IO with CORS settings
    io = new SocketIOServer(server, {
      cors: {
        origin: 'http://localhost:5173', // your frontend domain
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    // Step 4: Handle connection event
    io.on('connection', (socket) => {
      console.log('Socket connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
      });
    });

    // Start listening
    server.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();

// Step 5: Start scheduled job (optional, if needed)
cleanupExpiredNotifications();

// Error handling
process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', () => {
  process.exit(1);
});
