import React, { useState } from "react";

const EditNotes = ({ note, onClose, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [deadline, setDeadline] = useState(note.deadline);

  const handleUpdate = () => {
    if (!title.trim()) return;
    onUpdate({ ...note, title, description, deadline });
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[350px] rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Edit Note</h2>

        <input
          type="text"
          placeholder="Title"
          className="border w-full p-2 mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border w-full p-2 h-24 resize-none mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Deadline"
          className="border w-full p-2 mb-2 text-sm"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div className=" mt-3">
          <div className="flex gap-2">
            <button onClick={onClose} className="font-roboto px-3 py-1 bg-red-500 rounded text-sm text-white">
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNotes;
