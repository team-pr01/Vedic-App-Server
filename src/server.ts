import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import {Server} from 'http';
import { cleanupExpiredNotifications } from "./app/utils/cleanupExpiredNotifications";

let server : Server

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
cleanupExpiredNotifications();

process.on('unhandledRejection' , () => {
  if(server){
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
});

process.on('uncaughtException', () => {
  process.exit(1)
})
