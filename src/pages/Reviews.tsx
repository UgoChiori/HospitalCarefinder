import { useEffect, useState } from "react";
import "./review.css";

import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../components/Firebase";

interface Review {
  id: string;
  "Hospital Name": string;
  Rating: number;
  "Review Text": string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Fetch reviews from Firestore
    const fetchReviews = async () => {
      try {
        const reviewsCollectionRef = collection(db, "reviews");
        const snapshot = await getDocs(reviewsCollectionRef);
        const fetchedReviews: Review[] = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => ({
            id: doc.id,
            "Hospital Name": doc.data()["Hospital Name"],
            Rating: doc.data().Rating,
            "Review Text": doc.data()["Review Text"],
          })
        );
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="hospital-review-card-container">
    <h2>Reviews</h2>
      <div className="hospital-review-card">
     
        {/* Render the reviews */}
        {reviews.map((review) => (
          <div key={review.id} className="hospital-review-grid">
            <h3>{review["Hospital Name"]}</h3>
            <p>Rating: {review.Rating}</p>
            <p>{review["Review Text"]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
