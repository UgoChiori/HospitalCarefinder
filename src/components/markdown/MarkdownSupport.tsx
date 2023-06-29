import React, { useState, useEffect, ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
import { storage } from "../Firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, getFirestore } from "firebase/firestore";

interface HospitalEntry {
  name: string;
  content: string;
}

interface MarkdownEditorProps {
  content: string;
  onSave: (entry: HospitalEntry) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ content}) => {
  const [name, setName] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string[]>([]);

  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditorContent(event.target.value);
  };


  const handleSave = async () => {
    const entry: HospitalEntry = {
      name,
      content: editorContent,
    };

    const firestore = getFirestore();
  
    try {
      const docRef = await addDoc(collection(firestore, "entries"), entry);
      console.log("Entry saved with ID: ", docRef.id);
      setName("");
      setEditorContent("");
    } catch (error) {
      console.error("Error adding entry: ", error);
    }
  };


  const imagesListRef = ref(storage, "images/");
  const uploadImage = () => {
    if (imageUpload == null) {
      return;
    }
    const imageRef = ref(storage, `images/${imageUpload.name}-${uuidv4()}`);
    const uploadTask = uploadBytes(imageRef, imageUpload);

    uploadTask
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setImageURL((prevURLs) => [...prevURLs, downloadURL]);
        // alert("Image Uploaded. Thank you!");
        setImageURL((prevURL) => [...prevURL],)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageURL((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div>
      <h2 className="add-entry">Add Entry</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleTitleChange} />
      </div>
      <div>
        <label>Address:</label>
        <textarea
          value={editorContent}
          onChange={handleContentChange}
          rows={10}
          className="text-area"
        />
      </div>
      <div>
        <h2 className="preview">Preview</h2>
        <ReactMarkdown>{editorContent}</ReactMarkdown>
      </div>
      <div className="hospital-img">
        <label>Image:</label>
        <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              setImageUpload(e.target.files[0]);
            }
          }}
        />
        
        {imageURL.map((url) => (
          <img src={url} alt="hospital" width={50} height={50} style={{borderRadius: "8px"}} />
        ))}
      </div>

     <div className="markdown-button-container">
     <button className="markdown-button" type="button" onClick={uploadImage}>
          {" "}
          Upload Image{" "}
        </button>
      <button className="markdown-button" onClick={handleSave}>Save Entry</button>
     </div>
    </div>
  );
};

export default MarkdownEditor;
