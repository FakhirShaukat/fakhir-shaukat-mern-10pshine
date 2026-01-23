import Note from "../models/Note.js";

// GET all notes
export const getNotes = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
};

// CREATE note
export const createNote = async (req, res) => {
  const { title, description, deadline, color } = req.body;

  const note = new Note({
    title,
    description,
    deadline,
    color,
  });

  const createdNote = await note.save();
  res.status(201).json(createdNote);
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
