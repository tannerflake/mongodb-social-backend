import mongoose from "mongoose";
import dotenv from "dotenv";
import User, { IUser } from "../models/User";
import Thought, { IThought } from "../models/Thought";
import { Types } from "mongoose"; // Import ObjectId type

dotenv.config(); // Load environment variables

// **Connect to MongoDB**
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB");

// **Define Seed Users**
const users: Partial<IUser>[] = [
  {
    username: "JohnDoe",
    email: "john@example.com",
  },
  {
    username: "JaneSmith",
    email: "jane@example.com",
  },
  {
    username: "CoolUser123",
    email: "cooluser@example.com",
  },
];

// **Define Seed Thoughts**
const thoughts: Partial<IThought>[] = [
  {
    thoughtText: "This is my first thought!",
    username: "JohnDoe",
  },
  {
    thoughtText: "Loving this new social network!",
    username: "JaneSmith",
  },
];

// **Seed Function**
// **Seed Function**
const seedDatabase = async () => {
    try {
      const clearDatabase = process.argv.includes("--clear");
  
      if (clearDatabase) {
        await mongoose.connection.dropDatabase(); 
        console.log("🔥 Database cleared");
      } else {
        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log("🗑️ Removed existing users and thoughts");
      }
  
      // **Insert Users & Log them**
      const createdUsers = await User.insertMany(users);
      console.log("✅ Users inserted into DB:", createdUsers); // 🔥 Log inserted users
  
      // **Create User Map for Thoughts**
      const userMap: Record<string, Types.ObjectId> = createdUsers.reduce((map, user) => {
        if (user.username) {
          map[user.username as string] = user._id;
        }
        return map;
      }, {} as Record<string, Types.ObjectId>);
  
      // **Assign `userId` to Thoughts**
      const thoughtsWithUserIds = thoughts
        .filter((thought) => thought.username && userMap[thought.username])
        .map((thought) => ({
          ...thought,
          userId: userMap[thought.username as string],
        }));
  
      // **Insert Thoughts & Log them**
      const createdThoughts = await Thought.insertMany(thoughtsWithUserIds);
      console.log("✅ Thoughts inserted into DB:", createdThoughts); // 🔥 Log inserted thoughts
  
      process.exit();
    } catch (error) {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    }
  };

// ✅ Invoke the function
seedDatabase();