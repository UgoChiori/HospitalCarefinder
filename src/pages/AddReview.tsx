import { SetStateAction, useEffect, useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/Firebase";
import "./addreviews.css";
import { useNavigate } from "react-router-dom";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaStar } from "react-icons/fa";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



const mdParser = new MarkdownIt();



const ReviewEditor = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "");
      }
    });
    return () => unsubscribe();
  }, []);
  
  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        "Hospital Name": hospitalName,
        Rating: rating,
        "Review Text": reviewText,
        "UserName": userName,
      };

      await addDoc(collection(db, "reviews"), reviewData);

      console.log("Review added successfully!");
      

      // Reset input fields
      setHospitalName("");
      setRating(0);
      setReviewText("");
      setUserName("");
      navigate("/reviews");
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  const handleStarClick = (selectedRating: SetStateAction<number>) => {
    setRating(selectedRating);
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
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={star <= rating ? "star active" : "star"}
                // onClick={() => setRating(i + 1)}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="reviewText">Review Text:</label>
          <MdEditor
            value={reviewText}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ text }) => setReviewText(text)}
            style={{ height: "300px" }}
            className="review-editor"
          />
        </div>
        <button id="submit-review-btn" onClick={handleReviewSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewEditor;


