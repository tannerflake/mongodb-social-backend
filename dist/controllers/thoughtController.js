"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReaction = exports.addReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getThoughtById = exports.getAllThoughts = void 0;
const Thought_1 = __importDefault(require("../models/Thought"));
const User_1 = __importDefault(require("../models/User"));
// **GET all thoughts**
const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought_1.default.find(); // Fetch all thoughts
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch thoughts" });
    }
};
exports.getAllThoughts = getAllThoughts;
// **GET a single thought by ID**
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought_1.default.findById(req.params.thoughtId);
        if (!thought)
            return res.status(404).json({ error: "Thought not found" });
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch thought" });
    }
};
exports.getThoughtById = getThoughtById;
// **POST a new thought & link it to a user**
const createThought = async (req, res) => {
    try {
        const newThought = await Thought_1.default.create(req.body);
        // Push the new thought to the user's thoughts array
        await User_1.default.findByIdAndUpdate(req.body.userId, {
            $push: { thoughts: newThought._id }
        });
        res.status(201).json(newThought);
    }
    catch (err) {
        res.status(400).json({ error: "Failed to create thought" });
    }
};
exports.createThought = createThought;
// **PUT update a thought**
const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought_1.default.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!updatedThought)
            return res.status(404).json({ error: "Thought not found" });
        res.json(updatedThought);
    }
    catch (err) {
        res.status(400).json({ error: "Failed to update thought" });
    }
};
exports.updateThought = updateThought;
// **DELETE a thought**
const deleteThought = async (req, res) => {
    try {
        const deletedThought = await Thought_1.default.findByIdAndDelete(req.params.thoughtId);
        if (!deletedThought)
            return res.status(404).json({ error: "Thought not found" });
        // Remove the thought from the associated user's array
        await User_1.default.findByIdAndUpdate(deletedThought.username, {
            $pull: { thoughts: deletedThought._id }
        });
        res.json({ message: "Thought deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete thought" });
    }
};
exports.deleteThought = deleteThought;
// **POST add a reaction to a thought**
const addReaction = async (req, res) => {
    try {
        const updatedThought = await Thought_1.default.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, // Push new reaction
        { new: true, runValidators: true });
        if (!updatedThought)
            return res.status(404).json({ error: "Thought not found" });
        res.json(updatedThought);
    }
    catch (err) {
        res.status(400).json({ error: "Failed to add reaction" });
    }
};
exports.addReaction = addReaction;
// **DELETE remove a reaction from a thought**
const removeReaction = async (req, res) => {
    try {
        const updatedThought = await Thought_1.default.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Pull reaction by ID
        { new: true });
        if (!updatedThought)
            return res.status(404).json({ error: "Thought not found" });
        res.json(updatedThought);
    }
    catch (err) {
        res.status(400).json({ error: "Failed to remove reaction" });
    }
};
exports.removeReaction = removeReaction;
//# sourceMappingURL=thoughtController.js.map