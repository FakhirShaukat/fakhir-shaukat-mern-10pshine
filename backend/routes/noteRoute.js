import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// CREATE NOTE
router.post("/", createNote);

// GET USER NOTES
router.get("/", getNotes);

// UPDATE NOTE
router.put("/:id", updateNote);

// DELETE NOTE
router.delete("/:id", deleteNote);

export default router;
