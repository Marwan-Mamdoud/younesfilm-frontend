// "use client";
// import React, { useEffect, useRef, useState } from "react";

// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// const Quilll = () => {
//   const editorRef = useRef(null);
//   useEffect(() => {
//     // quill.root.innerHTML = "test review";

//     const quill = new Quill(editorRef.current, {
//       theme: "snow",
//       placeholder: "Type your content here...",
//     });

//     quill.on("text-change", () => {
//       setEditorContent(quill.root.innerHTML); // Store HTML content
//     });
//   }, []);
//   return (
//     <div className="flex flex-col items-start justify-start mt-10 gap-2">
//       <label htmlFor="">Review Behind The Scene of Project*</label>
//       <div
//         ref={editorRef}
//         style={{
//           height: "200px",
//           width: "100%",
//           backgroundColor: "white",
//           color: "black",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default Quilll;
// components/QuillEditor.js
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];

export default function QuillEditor({ value, onChange }) {
  return (
    <QuillNoSSRWrapper
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      theme="snow"
      style={{
        width: "100%",
        height: "300px",
        backgroundColor: "white",
        color: "black",
        marginBottom: "20px",
        overflow: "hidden",
      }}
    />
  );
}
