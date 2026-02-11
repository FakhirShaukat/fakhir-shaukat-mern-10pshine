import Note from "../models/Note.js";

// GET all notes for logged-in user
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

// CREATE note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate content
    if (!title || !content || content === "<p><br></p>") {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const note = await Note.create({
      title,
      content,
      user: req.user, // ✅ use user ID directly
    });

    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create note" });
  }
};

// UPDATE note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content || content === "<p><br></p>") {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user: req.user }, // ✅ use user ID directly
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.json(updatedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update note" });
  }
};

// DELETE note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({ _id: id, user: req.user }); // ✅ use user ID directly

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete note" });
  }
};
