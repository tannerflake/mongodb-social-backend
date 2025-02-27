import { Router } from "express";
import userRoutes from "./api/userRoutes";
import thoughtRoutes from "./api/thoughtRoutes";

const router = Router();

// **Mount User & Thought Routes**
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

export default router;