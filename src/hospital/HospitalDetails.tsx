import React from "react";
import { CSVLink } from "react-csv";
import "./hospitaldetails.css";




type Props = {
  name: string;
  status: any;
  rating: string;
  details: any;
 vicinity: string;
  opening_hours: boolean;
 
 
};

const HospitalDetails: React.FC<Props> = ({
  name,
  status,
  vicinity,
  rating,
  details,
  opening_hours,
 
  
}: Props) => {
  

  const hospitalData = [
    { name, status, rating, vicinity, opening_hours },
  ];


  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out the details of ${name}`,
      
        url: window.location.href,
        
      });
    } 
  };

  return (
    <div id="hospital_card_details_container">
      <div className="details-card">
        <h1>{details?.name}</h1>
        <h2 className="biz-status">{details?.business_status}</h2>
        <p className="formatted_address">{details?.vicinity}</p>
        <h4 className="ratings">{details?.rating}</h4>
       {details?.opening_hours && (
          <p className="opening_hours">Open Now</p>
       )}
       
       
      </div>
      <div id="hospital_card_details_share">
        <button onClick={handleShare}>Share</button>
        
        <CSVLink data={hospitalData}  className="csv">Download </CSVLink>
      </div>

      
    </div>
  );
};

export default HospitalDetails;




