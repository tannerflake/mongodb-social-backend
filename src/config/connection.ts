import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB"; // ✅ Use correct DB

mongoose.connect(dbUri, {});

mongoose.connection.once("open", () => {
  console.log(`✅ MongoDB connected: ${mongoose.connection.name}`); // Debugging log
});

export default mongoose.connection;