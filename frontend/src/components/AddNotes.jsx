import React, { useState } from "react";
import ReactQuill from "react-quill";
import RichTextEditor from "./RichTextEditor";
import "react-quill/dist/quill.snow.css";
import { assets } from "../assets/assets";

const AddNotes = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return; // ✅ check both fields
    onSave({ title, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Add New Note</h2>

        <input
          type="text"
          placeholder="Title"
          className="border border-gray-300 w-full w- p-2 mb-2 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <RichTextEditor
          value={content}
          setContent={setContent}
          className="mb-2"
            data-testid="content-editor"

        />

        <div className="flex justify-end gap-2 mt-20">
          <button onClick={onClose} className="px-3 py-2 text-center bg-gray-200 text-black rounded text-xs hover:bg-gray-300 transition-colors">
            <img src={assets.cancel} alt="Cancel" className="w-3 h-3 inline mr-2 " />
            Cancel
          </button>
          <button onClick={handleSave} className="px-3 py-2 text-center bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors">
            <img src={assets.save} alt="Save" className="w-4 h-4 inline  mr-2 invert" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNotes;
