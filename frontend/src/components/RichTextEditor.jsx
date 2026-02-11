import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, setContent }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setContent}
      className="h-[150px]"
      placeholder="Write your note here..."
    />
  );
};

export default RichTextEditor;
