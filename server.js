import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 1115;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" })); // Adjust front-end origin if needed

// Home route
app.get("/", (req, res) => {
  res.send('For all data visit http://localhost:' + port + '/api/users');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongoose connected successfully.");
  })
  .catch((err) => {
    console.error("Mongoose connection error:", err);
  });

// Use routes
app.use("/api/users", userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
