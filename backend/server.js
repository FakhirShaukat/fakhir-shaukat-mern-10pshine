import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectDB from "./config/database.js";
import noteRoutes from "./routes/noteRoute.js";
import authRoutes from "./routes/authRoute.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

/* REST APIs */
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Notes API running");
});

export default app;