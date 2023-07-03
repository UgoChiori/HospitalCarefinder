// import React, { useEffect, useState } from "react";
// import { CSVLink } from "react-csv";
// import "./hospitaldetails.css";
// import { Link } from "react-router-dom";

// type Props = {
//   name: string;
//   business_status: any;
//   rating: string;
//   details: any;
//   vicinity: string;
//   opening_hours: boolean;
// };

// const HospitalDetails: React.FC<Props> = ({
//   name,
//   business_status,
//   vicinity,
//   rating,
//   details,
//   opening_hours,
// }: Props) => {
//   const hospitalData = [
//     {
//       name: name,
//       business_status: business_status,
//       rating: rating,
//       vicinity: vicinity,
//       opening_hours: opening_hours,
//     },
//   ];

//   const [loading, setLoading] = useState(true);

//   const handleShare = () => {
//     const shareData = {
//       title: "Hospital Details",
//       text: `Name: ${name}, Status: ${business_status}, Rating: ${rating}, Vicinity: ${vicinity}, Opening Hours: ${opening_hours}`,
//       url: window.location.href,
//     };

//     // CALL API ENDPOINT TO SHARE THE DATA
//     fetch("/api/maps/place/share", {
//       method: "POST",
//       body: JSON.stringify(shareData),
//       headers: {
//         "content-type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Success:", data);
//         alert("Data shared successfully");
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("Error sharing data");
//       });
//   };

//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   const RatingStars = ({ rating }: { rating: number }) => {
//     const filledStars = "★".repeat(rating);
//     const emptyStars = "☆".repeat(5 - rating);
//     const stars = filledStars + emptyStars;

//     return <div className="rating">{stars}</div>;

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   }
//   return (
//     <div>
//       <div id="hospital_card_details_container">
//         <div className="details-card">
//           <h1>{details?.name}</h1>
//           <h2 className="biz-status">{details?.business_status}</h2>
//           <p className="formatted_address">{details?.vicinity}</p>
//           {/* <h4 className="ratings">{details?.rating}</h4> */}
//           <RatingStars rating={details?.rating} />
//           {details?.opening_hours && <p className="opening_hours">Open Now</p>}
//         </div>
//       </div>

//       <div className="hospital-button-container">
//         <button className="hospital-button" onClick={handleShare}>Share</button>

//         <CSVLink data={hospitalData} className="csv">
//           Download{" "}
//         </CSVLink>
//       </div>
//       <Link className="nav-link" style={{color: "black"}} to="/">
//         Home
//       </Link>
//       <Link className="nav-link" style={{color: "black"}} to="/hospitals">
//         Hospitals</Link>

//     </div>
//   );
// };

// export default HospitalDetails;

import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import "./hospitaldetails.css";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  name: string;
  business_status: any;
  rating: string;
  details: any;
  vicinity: string;
  opening_hours: boolean;
};

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

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleSave = () => {
    // Perform the save operation here
    // You can call an API endpoint or update the user's profile in the database
    // with the hospital details
    const saveData = {
      title: "Hospital Details",
      text: `Name: ${name}, Status: ${business_status}, Rating: ${rating}, Vicinity: ${vicinity}, Opening Hours: ${opening_hours}`,
      url: window.location.href,
    };

    // CALL API ENDPOINT TO SAVE THE DATA
    fetch("/api/maps/place/save", {
      method: "POST",
      body: JSON.stringify(saveData),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/profile")
        console.log("Success:", data);
        alert("Data saved successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        // alert("Error saving data");
      });
      navigate("/profile")
    alert("Hospital details saved!");
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const RatingStars = ({ rating }: { rating: number }) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    const stars = filledStars + emptyStars;

    return <div className="rating">{stars}</div>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id="hospital_card_details_container">
        <div className="details-card">
          <h1>{details?.name}</h1>
          <h2 className="biz-status">{details?.business_status}</h2>
          <p className="formatted_address">{details?.vicinity}</p>
          {/* <h4 className="ratings">{details?.rating}</h4> */}
          <RatingStars rating={details?.rating} />
          {details?.opening_hours && <p className="opening_hours">Open Now</p>}
        </div>
      </div>

      <div className="hospital-button-container">
        <button className="hospital-button" onClick={handleShare}>
          Share
        </button>

        <button className="hospital-button" onClick={handleSave}>
          Save
        </button>

        <CSVLink data={hospitalData} className="csv">
          Download
        </CSVLink>
      </div>

      <Link className="nav-link" style={{ color: "black" }} to="/">
        Home
      </Link>
      <Link className="nav-link" style={{ color: "black" }} to="/hospitals">
        Hospitals
      </Link>
    </div>
  );
};

export default HospitalDetails;
