import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import session from "express-session";
import connectDB from "./config/database.js";
import noteRoutes from "./routes/noteRoute.js";
import authRoutes from "./routes/authRoute.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

/*REST APIs*/ 
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Notes API running ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
