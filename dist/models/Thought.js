"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 3️⃣ Reaction Schema (Subdocument)
const ReactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    // Define as a standard Date field
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { getters: true }, // Apply getters
    id: false,
});
// Attach a getter *after* schema creation
ReactionSchema.path("createdAt").get(function (value) {
    return value.toISOString();
});
// 4️⃣ Thought Schema (Main)
const ThoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    // Also define as standard Date
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    // Embed Reaction subdocuments
    reactions: [ReactionSchema],
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false,
});
// Attach a getter for Thought's createdAt
ThoughtSchema.path("createdAt").get(function (value) {
    return value.toISOString();
});
// 5️⃣ Virtual Property: reactionCount
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});
// 6️⃣ Create and export the Thought model
const Thought = (0, mongoose_1.model)("Thought", ThoughtSchema);
exports.default = Thought;
//# sourceMappingURL=Thought.js.map