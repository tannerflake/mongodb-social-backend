"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// **Define the Schema**
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Email validation
    },
    thoughts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Thought", // Reference to Thought model
        },
    ],
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User", // Self-reference to User model
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// **Virtual Property: friendCount**
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});
// **Create and export the model**
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map