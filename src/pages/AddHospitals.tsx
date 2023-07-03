import { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./addhospitals.css";
import { db } from "../components/Firebase";
import { collection, doc, setDoc} from "firebase/firestore";

const mdParser = new MarkdownIt();

const AddHospitals = () => {
  const [value, setValue] = useState("");
  const handleEditorChange = ({ html, text }: { html: any; text: any }) => {
    setValue(text);
  };

  const handleSubmit = async () => {
    try {
      const newDocRef = doc(collection(db, "hospital"));
      await setDoc(newDocRef, { content: value });
      console.log("Document creation successful");
      setValue("");
    } catch (error) {
      console.error("Document creation error:", error);
    }
  };



    

  


  return (
    <div className="add-hospitals-container">
      <MdEditor
        value={value}
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}/>
        {/* <button className="add-hospitals-button" onClick={handleSubmit}> Submit </button> */}
      
    </div>
  );
};

export default AddHospitals;
