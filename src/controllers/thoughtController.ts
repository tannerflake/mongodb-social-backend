import { Request, Response } from "express";
import Thought, { IThought } from "../models/Thought";
import User from "../models/User";

// **GET all thoughts**
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find(); // Fetch all thoughts
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch thoughts" });
  }
};

// **GET a single thought by ID**
export const getThoughtById = async (req: Request, res: Response) => {
    try {
      const thought: IThought | null = await Thought.findById(req.params.thoughtId);
      if (!thought) return res.status(404).json({ error: "Thought not found" });
      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch thought" });
    }
  };

// **POST a new thought & link it to a user**
export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await Thought.create(req.body);

    // Push the new thought to the user's thoughts array
    await User.findByIdAndUpdate(req.body.userId, { 
      $push: { thoughts: newThought._id } 
    });

    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json({ error: "Failed to create thought" });
  }
};

// **PUT update a thought**
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
    if (!updatedThought) return res.status(404).json({ error: "Thought not found" });
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: "Failed to update thought" });
  }
};

// **DELETE a thought**
export const deleteThought = async (req: Request, res: Response) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
  
      if (!deletedThought) {
        console.log("❌ Thought not found:", req.params.thoughtId);
        return res.status(404).json({ error: "Thought not found" });
      }
  
      console.log(`✅ Successfully deleted thought: ${req.params.thoughtId}`);
      res.json({ message: "Thought deleted successfully" });
    } catch (err: any) { // Ensure err is typed as 'any' to avoid issues
      console.error("❌ Error deleting thought:", err);
  
      res.status(500).json({
        error: "Failed to delete thought",
        details: err instanceof Error ? err.message : String(err) // Ensure err.message is valid
      });
    }
  };

// **POST add a reaction to a thought**
export const addReaction = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } }, // Push new reaction
      { new: true, runValidators: true }
    );
    if (!updatedThought) return res.status(404).json({ error: "Thought not found" });
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: "Failed to add reaction" });
  }
};

// **DELETE remove a reaction from a thought**
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Pull reaction by ID
      { new: true }
    );
    if (!updatedThought) return res.status(404).json({ error: "Thought not found" });
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: "Failed to remove reaction" });
  }
};