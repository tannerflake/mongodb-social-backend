import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } from "../../controllers/userController";

const router = Router();

// **GET all users & POST a new user**
router.route("/").get(getAllUsers).post(createUser);

// **GET one user, UPDATE, and DELETE**
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// **Add & Remove Friends**
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

export default router;