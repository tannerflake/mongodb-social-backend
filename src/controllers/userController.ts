import { Request, Response } from "express";
import User from "../models/User";

// **GET all users**
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    console.log("🔥 Querying Users from DB...");
    console.log("📌 Users fetched from Mongoose:", users);
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// **GET a single user by ID**
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("friends")
      .populate("thoughts");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// **POST a new user**
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: "Failed to create user" });
  }
};

// **PUT update a user**
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: "Failed to update user" });
  }
};

// **DELETE a user**
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// **✅ FIXED: POST add a friend**
export const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;

    // Find both users
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: "User or Friend not found" });
    }

    // Check if they are already friends
    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      await user.save(); // ✅ Save the updated user document
    }

    res.json(user);
  } catch (err) {
    console.error("❌ Error adding friend:", err);
    res.status(500).json({ error: "Failed to add friend" });
  }
};

// **✅ FIXED: DELETE remove a friend**
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Remove the friend from the array
    user.friends = user.friends.filter(
      (id) => id.toString() !== friendId.toString()
    );

    await user.save(); // ✅ Save changes

    res.json(user);
  } catch (err) {
    console.error("❌ Error removing friend:", err);
    res.status(500).json({ error: "Failed to remove friend" });
  }
};