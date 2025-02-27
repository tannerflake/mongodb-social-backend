"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
// **GET all users**
const getAllUsers = async (_req, res) => {
    try {
        const users = await User_1.default.find();
        console.log("🔥 Querying Users from DB...");
        console.log("📌 Users fetched from Mongoose:", users);
        res.json(users);
    }
    catch (err) {
        console.error("❌ Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
exports.getAllUsers = getAllUsers;
// **GET a single user by ID**
const getUserById = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.userId)
            .populate("friends")
            .populate("thoughts");
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};
exports.getUserById = getUserById;
// **POST a new user**
const createUser = async (req, res) => {
    try {
        const newUser = await User_1.default.create(req.body);
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ error: "Failed to create user" });
    }
};
exports.createUser = createUser;
// **PUT update a user**
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User_1.default.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
        if (!updatedUser)
            return res.status(404).json({ error: "User not found" });
        res.json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ error: "Failed to update user" });
    }
};
exports.updateUser = updateUser;
// **DELETE a user**
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User_1.default.findByIdAndDelete(req.params.userId);
        if (!deletedUser)
            return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};
exports.deleteUser = deleteUser;
// **✅ FIXED: POST add a friend**
const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        // Find both users
        const user = await User_1.default.findById(userId);
        const friend = await User_1.default.findById(friendId);
        if (!user || !friend) {
            return res.status(404).json({ error: "User or Friend not found" });
        }
        // Check if they are already friends
        if (!user.friends.includes(friend._id)) {
            user.friends.push(friend._id);
            await user.save(); // ✅ Save the updated user document
        }
        res.json(user);
    }
    catch (err) {
        console.error("❌ Error adding friend:", err);
        res.status(500).json({ error: "Failed to add friend" });
    }
};
exports.addFriend = addFriend;
// **✅ FIXED: DELETE remove a friend**
const removeFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        // Remove the friend from the array
        user.friends = user.friends.filter((id) => id.toString() !== friendId.toString());
        await user.save(); // ✅ Save changes
        res.json(user);
    }
    catch (err) {
        console.error("❌ Error removing friend:", err);
        res.status(500).json({ error: "Failed to remove friend" });
    }
};
exports.removeFriend = removeFriend;
//# sourceMappingURL=userController.js.map