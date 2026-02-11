import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { assets } from "../assets/assets";

const EditNotes = ({ note, onClose, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleUpdate = () => {
    if (!title.trim() || !content.trim()) return; // ✅ check both
    onUpdate({ ...note, title, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Edit Note</h2>

        <input
          type="text"
          placeholder="Title"
          className="border w-full border-gray-300 p-2 mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <ReactQuill value={content} onChange={setContent} className="mb-2 h-[150px]" />

        <div className="flex justify-end gap-2 mt-20">
          <button onClick={onClose} className="px-3 py-2 bg-red-500 text-white text-center  rounded text-xs hover:bg-red-600 transition-colors">
            <img src={assets.cancel} alt="Cancel" className="w-3 h-3 inline mr-2 invert  " />
            Cancel
          </button>
          <button onClick={handleUpdate} className="px-3 py-1 bg-green-500 text-white  text-center rounded text-xs hover:bg-green-600 transition-colors">
            <img src={assets.save} alt="Save" className="w-4 h-4 inline  mr-2 invert" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNotes;
