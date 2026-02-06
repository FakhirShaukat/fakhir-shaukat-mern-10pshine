import Note from "../models/Note.js";

// GET all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE note
export const createNote = async (req, res) => {
  try {
    const { title, description, deadline, color } = req.body;

    if (!req.user) return res.status(401).json({ message: "User not found" });

    const note = new Note({
      user: req.user._id,
      title,
      description,
      deadline,
      color,
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// UPDATE note
export const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  note.title = req.body.title || note.title;
  note.description = req.body.description || note.description;
  note.deadline = req.body.deadline || note.deadline;
  note.color = req.body.color || note.color;

  const updatedNote = await note.save();
  res.json(updatedNote);
};

// DELETE note
export const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  await note.deleteOne();
  res.json({ message: "Note deleted" });
};
