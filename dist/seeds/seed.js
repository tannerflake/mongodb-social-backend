"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const Thought_1 = __importDefault(require("../models/Thought"));
dotenv_1.default.config(); // Load environment variables
// **Connect to MongoDB**
mongoose_1.default.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB");
// **Define Seed Users**
const users = [
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
const thoughts = [
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
            await mongoose_1.default.connection.dropDatabase();
            console.log("🔥 Database cleared");
        }
        else {
            await User_1.default.deleteMany({});
            await Thought_1.default.deleteMany({});
            console.log("🗑️ Removed existing users and thoughts");
        }
        // **Insert Users & Log them**
        const createdUsers = await User_1.default.insertMany(users);
        console.log("✅ Users inserted into DB:", createdUsers); // 🔥 Log inserted users
        // **Create User Map for Thoughts**
        const userMap = createdUsers.reduce((map, user) => {
            if (user.username) {
                map[user.username] = user._id;
            }
            return map;
        }, {});
        // **Assign `userId` to Thoughts**
        const thoughtsWithUserIds = thoughts
            .filter((thought) => thought.username && userMap[thought.username])
            .map((thought) => ({
            ...thought,
            userId: userMap[thought.username],
        }));
        // **Insert Thoughts & Log them**
        const createdThoughts = await Thought_1.default.insertMany(thoughtsWithUserIds);
        console.log("✅ Thoughts inserted into DB:", createdThoughts); // 🔥 Log inserted thoughts
        process.exit();
    }
    catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};
// ✅ Invoke the function
seedDatabase();
//# sourceMappingURL=seed.js.map