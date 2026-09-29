import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import mongoose from "mongoose";
import { DB_URI } from "../config/config.js";

export async function testDBConnection() {
  try {
    await mongoose.connect(DB_URI);
    await mongoose.syncIndexes();
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection failed");
    console.log(error);
  }
}
