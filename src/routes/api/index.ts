import { Router } from "express";
import userRoutes from "./userRoutes";
import thoughtRoutes from "./thoughtRoutes";

const router = Router();

// Define API routes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

export default router;