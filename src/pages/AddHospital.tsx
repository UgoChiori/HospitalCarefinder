import React, { useState } from "react";
import MarkdownEditor from "../components/markdown/MarkdownSupport";
import { marked } from "marked";
import { NavLink } from "react-router-dom";
import "./addhospital.css"

interface HospitalEntry {
  name: string;
  content: string;
}

const AddHospital: React.FC = () => {
  const [hospitalEntry, setHospitalEntry] = useState<HospitalEntry | null>(
    null
  );
  const [existingContent] = useState("");


 
  const handleSaveEntry = (entry: HospitalEntry) => {
    setHospitalEntry(entry);
   };
  

    const renderMarkdown = (markdown: string) => {
        return { __html: marked(markdown) };
    };


   
  return (
    <div className="hospital-entry-container">
      <h1>Add Hospital</h1>

      <MarkdownEditor
        content={""}
        onSave={function (_entry: HospitalEntry) {
          throw new Error("Function not implemented.");
        }}
      />

      {hospitalEntry && (
        <div className="markdown-editor-container">
          <h3>Create Hospital Entry</h3>
          <MarkdownEditor content={existingContent} onSave={handleSaveEntry} />
        </div>
      )}

      {hospitalEntry && (
        <div className="markdown-editor-container">
          <h3>Create Hospital Entry</h3>
          <MarkdownEditor content={existingContent} onSave={handleSaveEntry} />
        </div>
      )}
      {hospitalEntry && (
        <div className="markdown-preview-container">
          <h3>Hospital Entry Preview</h3>
          <div
            className="markdown-preview"
            dangerouslySetInnerHTML={renderMarkdown(hospitalEntry.content)}
          ></div>
        </div>
      )}

        <NavLink className="nav-link" to="/">Back to Home</NavLink>
    </div>
  );
};

export default AddHospital;
