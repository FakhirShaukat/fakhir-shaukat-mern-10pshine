import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/authRoute.js";
import noteRoutes from "./routes/noteRoute.js";
import connectdb from "./config/database.js";

connectdb();
console.log("MONGO_URI:", process.env.MONGO_URI);


const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

export default app; 
