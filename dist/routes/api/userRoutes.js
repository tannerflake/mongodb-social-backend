"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/userController");
const router = (0, express_1.Router)();
// **GET all users & POST a new user**
router.route("/").get(userController_1.getAllUsers).post(userController_1.createUser);
// **GET one user, UPDATE, and DELETE**
router.route("/:userId").get(userController_1.getUserById).put(userController_1.updateUser).delete(userController_1.deleteUser);
// **Add & Remove Friends**
router.route("/:userId/friends/:friendId").post(userController_1.addFriend).delete(userController_1.removeFriend);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map