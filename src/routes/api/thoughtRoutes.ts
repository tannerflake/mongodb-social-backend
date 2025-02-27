import { Router } from "express";
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from "../../controllers/thoughtController";

const router = Router();

// GET all thoughts & POST a new thought
router.route("/").get(getAllThoughts).post(createThought);

// GET, PUT, DELETE a thought by ID
router.route("/:thoughtId").get(getThoughtById).put(updateThought).delete(deleteThought);

// POST & DELETE reactions
router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

export default router;