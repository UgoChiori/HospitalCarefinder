// import React, { useState } from 'react';
// import ReactMarkdown from 'react-markdown';

// interface MarkdownEditorProps {
//   onChange: (markdown: string) => void;
// }

// const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ onChange }) => {
//   const [markdown, setMarkdown] = useState('');

//   const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const { value } = event.target;
//     setMarkdown(value);
//     onChange(value);
//   };

//   return (
//     <div>
//       <textarea value={markdown} onChange={handleInputChange} rows={10} />
//       <div>
//         <h2>Preview</h2>
//         <ReactMarkdown>{markdown}</ReactMarkdown>
//       </div>
//     </div>
//   );
// };

// export default MarkdownEditor;


// import React, { useState } from 'react';
// import ReactMarkdown from 'react-markdown';

// interface HospitalEntry {
//   title: string;
//   content: string;
// }

// interface MarkdownEditorProps {
//   onSave: (entry: HospitalEntry) => void;
// }

// const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ onSave }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(event.target.value);
//   };

//   const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setContent(event.target.value);
//   };

//   const handleSave = () => {
//     const entry: HospitalEntry = {
//       title,
//       content,
//     };
//     onSave(entry);
//     setTitle('');
//     setContent('');
//   };

//   return (
//     <div>
//       <h2>Create Hospital Entry</h2>
//       <div>
//         <label>Title:</label>
//         <input type="text" value={title} onChange={handleTitleChange} />
//       </div>
//       <div>
//         <label>Content:</label>
//         <textarea value={content} onChange={handleContentChange} rows={10} />
//       </div>
//       <div>
//         <h2>Preview</h2>
//         <ReactMarkdown>{content}</ReactMarkdown>
//       </div>
//       <button onClick={handleSave}>Save Entry</button>
//     </div>
//   );
// };

// export default MarkdownEditor;


// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';

// interface HospitalEntry {
//   title: string;
//   content: string;
// }

// interface MarkdownEditorProps {
//   existingContent: string;
//   onSave: (entry: HospitalEntry) => void;
// }

// const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ existingContent, onSave }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   useEffect(() => {
//     setContent(existingContent);
//   }, [existingContent]);

//   const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(event.target.value);
//   };

//   const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setContent(event.target.value);
//   };

//   const handleSave = () => {
//     const entry: HospitalEntry = {
//       title,
//       content,
//     };
//     onSave(entry);
//     setTitle('');
//     setContent('');
//   };

//   return (
//     <div>
//       <h2>Create Hospital Entry</h2>
//       <div>
//         <label>Title:</label>
//         <input type="text" value={title} onChange={handleTitleChange} />
//       </div>
//       <div>
//         <label>Content:</label>
//         <textarea value={content} onChange={handleContentChange} rows={10} />
//       </div>
//       <div>
//         <h2>Preview</h2>
//         <ReactMarkdown>{content}</ReactMarkdown>
//       </div>
//       <button onClick={handleSave}>Save Entry</button>
//     </div>
//   );
// };

// export default MarkdownEditor;

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface HospitalEntry {
  title: string;
  content: string;
}

interface MarkdownEditorProps {
  content: string;
  onSave: (entry: HospitalEntry) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ content, onSave }) => {
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(event.target.value);
  };

  const handleSave = () => {
    const entry: HospitalEntry = {
      title,
      content: editorContent,
    };
    onSave(entry);
    setTitle('');
    setEditorContent('');
  };

  return (
    <div>
      <h2>Create Hospital Entry</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={editorContent} onChange={handleContentChange} rows={10} />
      </div>
      <div>
        <h2>Preview</h2>
        <ReactMarkdown>{editorContent}</ReactMarkdown>
      </div>
      <button onClick={handleSave}>Save Entry</button>
    </div>
  );
};

export default MarkdownEditor;