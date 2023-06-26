import React, { useState } from "react";
import MarkdownEditor from "../components/markdown/MarkdownSupport";
import { marked } from "marked";
import { NavLink } from "react-router-dom";
import "./addoctor.css";

interface DoctorEntry {
  name: string;
  content: string;
}

const AddDoctor: React.FC = () => {
  const [doctorEntry, setDoctorEntry] = useState<DoctorEntry | null>(
    null
  );
  const [existingContent] = useState("");


 
  const handleSaveEntry = (entry: DoctorEntry) => {
    setDoctorEntry(entry);
   };
  

    const renderMarkdown = (markdown: string) => {
        return { __html: marked(markdown) };
    };


   
  return (
    <div  className="doctor-entry-container">
      <h1>Add Doctor</h1>

      <MarkdownEditor
        content={""}
        onSave={function (_entry: DoctorEntry) {
          throw new Error("Function not implemented.");
        }}
      />

      {doctorEntry && (
        <div className="markdown-editor-container">
          <h3>Doctor Entry</h3>
          <MarkdownEditor content={existingContent} onSave={handleSaveEntry} />
        </div>
      )}

      {doctorEntry && (
        <div className="markdown-editor-container">
          <h3>Create Entry</h3>
          <MarkdownEditor content={existingContent} onSave={handleSaveEntry} />
        </div>
      )}
      {doctorEntry && (
        <div className="markdown-preview-container">
          <h3>Doctor Entry Preview</h3>
          <div
            className="markdown-preview"
            dangerouslySetInnerHTML={renderMarkdown(doctorEntry.content)}
          ></div>
        </div>
      )}
        <NavLink className="nav-link" to="/">Back to Home</NavLink>
    </div>
  );
};

export default AddDoctor;
