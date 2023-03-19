import mongoose from "mongoose";
import config from "./config";
import { Logging } from "./logging";

export async function connectToDb() {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(config.MONGO_URI, { retryWrites: true, w: 'majority' })
    .then(() => {
      Logging.info("DATABASE", "Connected to database");
    })
    .catch((error) => {
      Logging.error("DATABASE", "Error connecting to database", error);
    });

}

export function disconnectFromDb() {
  return mongoose.connection.close();
}