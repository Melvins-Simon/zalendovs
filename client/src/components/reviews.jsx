import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/reviews.css"; 

export default function Reviews() {
  // State to hold the reviews fetched from the server
  const [reviews, setReviews] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  async function getReviews() {
    try {
      const response = await axios.get(`${API_URL}/api/reviews`);
      setReviews(response.data.reviews); // Set the reviews in state
      console.log("Fetched reviews:", response.data.reviews);
      
      
      
    } catch (error) {
      console.error("Error fetching reviews:", error);
      
    }
  }
  // Call the getReviews function when the component mounts
  // to fetch the reviews from the server
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <div className="reviews-container">
      <h2>User Feedback</h2>
      <div className="reviews-cards">
        {reviews && reviews.length ? reviews.map((review) => (
          <div className="review-card" key={review._id}>
            <p className="review-name">{review.name}</p>
            <p className="review-rating">Rating: <span>{review.rating}</span></p>
            <p className="review-review">{review.review}</p>
          </div>
        )): null}
      </div>
      <button className="back-button" onClick={() => window.history.back()}>
        Back to Dashboard
      </button>
    </div>
  );
}
