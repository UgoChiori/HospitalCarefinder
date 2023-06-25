import React, { useState } from "react";
import { CSVLink } from "react-csv";
import "./hospitaldetails.css";
import MarkdownEditor from "../components/markdown/MarkdownSupport";

type Props = {
  name: string;
  business_status: any;
  rating: string;
  details: any;
  vicinity: string;
  opening_hours: boolean;
};

interface HospitalEntry {
  title: string;
  content: string;
}

const HospitalDetails: React.FC<Props> = ({
  name,
  business_status,
  vicinity,
  rating,
  details,
  opening_hours,
}: Props) => {
  const hospitalData = [
    {
      name: name,
      business_status: business_status,
      rating: rating,
      vicinity: vicinity,
      opening_hours: opening_hours,
    },
  ];
  const [hospitalEntry, setHospitalEntry] = useState<HospitalEntry | null>(null);
  const [existingContent] = useState("");

 const handleSaveEntry = (entry: HospitalEntry) => {
  setHospitalEntry(entry);
 };

  const handleShare = () => {
    const shareData = {
      title: "Hospital Details",
      text: `Name: ${name}, Status: ${business_status}, Rating: ${rating}, Vicinity: ${vicinity}, Opening Hours: ${opening_hours}`,
      url: window.location.href,
    };

    // CALL API ENDPOINT TO SHARE THE DATA
    fetch("/api/maps/place/share", {
      method: "POST",
      body: JSON.stringify(shareData),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Data shared successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error sharing data");
      });
  };

  const renderMarkdown = (markdown: string) => {
    // Render the markdown into HTML using marked library
    const html = (markdown);
    return { __html: html };
  };

  return (
    <div id="hospital_card_details_container">
      <div className="details-card">
        <h1>{details?.name}</h1>
        <h2 className="biz-status">{details?.business_status}</h2>
        <p className="formatted_address">{details?.vicinity}</p>
        <h4 className="ratings">{details?.rating}</h4>
        {details?.opening_hours && <p className="opening_hours">Open Now</p>}
      </div>
      <div id="hospital_card_details_share">
        <button onClick={handleShare}>Share</button>

        <CSVLink data={hospitalData} className="csv">
          Download{" "}
        </CSVLink>

        {hospitalEntry && (
          <div className="markdown-editor-container">
            <h3>Create Hospital Entry</h3>
            <MarkdownEditor
              content={existingContent}
              onSave={handleSaveEntry}
            />
          </div>
)}

        {hospitalEntry && (
          <div className="markdown-editor-container">
            <h3>Create Hospital Entry</h3>
            <MarkdownEditor 
            content={existingContent}
             onSave={handleSaveEntry} />
            </div>
        )}
         {hospitalEntry && (
              <div className="markdown-preview-container">
                <h3>Hospital Entry Preview</h3>
                <div
                  className="markdown-preview"
                  dangerouslySetInnerHTML={renderMarkdown(
                    hospitalEntry.content
                  )}
                >

                </div>
      </div>
    )}

    </div>
    </div>
  );
};



export default HospitalDetails;
