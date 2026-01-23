import React, { useState } from "react";

const AddNotes = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title, description, deadline });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[350px] rounded-lg p-4">

        <h2 className="text-lg font-semibold mb-2">Add New Note</h2>

        <input
          type="text"
          placeholder="Title"
          className="border w-full p-2 mb-2 text-sm"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border w-full p-2 h-24 resize-none text-sm"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Deadline"
          className="border w-full p-2 mt-2 text-sm"
          onChange={(e) => setDeadline(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose} className="px-3 py-1 bg-red-500 rounded text-white text-sm">
            Cancel
          </button>
          <button onClick={handleSave} className="px-3 py-1 bg-green-500 text-white rounded text-sm">
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddNotes;
