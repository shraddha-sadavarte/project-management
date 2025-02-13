import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js"; // ✅ Import routes

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Route Mounting
app.use("/api/auth", authRoutes);

// ✅ Debugging: Show registered routes
console.log("Registered Routes:");
console.log(
  app._router.stack
    .filter((r) => r.route)
    .map((r) => ({
      path: r.route.path,
      methods: r.route.methods,
    }))
);

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
