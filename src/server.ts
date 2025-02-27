import express from "express";
import "./config/connection"; // Ensure DB connects
import router from "./routes";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// ✅ Ensure `/api` is prefixed correctly
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});