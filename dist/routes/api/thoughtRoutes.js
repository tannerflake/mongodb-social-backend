"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtController_1 = require("../../controllers/thoughtController");
const router = (0, express_1.Router)();
// GET all thoughts & POST a new thought
router.route("/").get(thoughtController_1.getAllThoughts).post(thoughtController_1.createThought);
// GET, PUT, DELETE a thought by ID
router.route("/:thoughtId").get(thoughtController_1.getThoughtById).put(thoughtController_1.updateThought).delete(thoughtController_1.deleteThought);
// POST & DELETE reactions
router.route("/:thoughtId/reactions").post(thoughtController_1.addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(thoughtController_1.removeReaction);
exports.default = router;
//# sourceMappingURL=thoughtRoutes.js.map