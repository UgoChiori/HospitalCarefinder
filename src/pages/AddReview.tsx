import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/Firebase";
import "./addreviews.css";
import { useNavigate } from "react-router-dom";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const ReviewEditor = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();

  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        "Hospital Name": hospitalName,
        Rating: rating,
        "Review Text": reviewText,
      };

      await addDoc(collection(db, "reviews"), reviewData);

      console.log("Review added successfully!");

      // Reset input fields
      setHospitalName("");
      setRating(0);
      setReviewText("");
      navigate('/reviews');
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  return (
    <div className="add-review-container">
      <div className="active-review">
        <h2 className="review-heading">Write a Review</h2>
        <div>
          <label htmlFor="hospitalName">Hospital Name:</label>
          <input
            type="text"
            id="hospitalName"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="reviewText">Review Text:</label>
          <textarea
            className="review-text"
            placeholder="Write review text"
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        <button id="submit-review-btn" onClick={handleReviewSubmit}>Submit Review</button>
      </div>
      
    </div>
  );
};

export default ReviewEditor;
