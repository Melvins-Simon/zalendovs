import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import "../styles/feedback.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ElectionContext } from "../contexts/Globalcontext";
import axios from "axios";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { userDetails, setUserDetails } = useContext(ElectionContext);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  
  async function handleSubmitFeedback(event) {
    event.preventDefault();
    const response = await axios.post(`${API_URL}/api/review`, {
      name: userDetails.firstname,
      rating,
      review: event.target.review.value,
    });

    toast.success("Thank you for your feedback.");
    navigate("/voter");
  }
  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
    console.log("Current Index:", getCurrentIndex);
    console.log("Rating:", rating);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rating);
  }
  return (
    <div className="feedback-container">
      <form className="feedback-form" onSubmit={handleSubmitFeedback}>
        <h2>Feedback Dashboard</h2>
        <p>Please Rate our App</p>
        <div className="star-rating">
          {[...Array(5)].map((_, index) => {
            index += 1;

            return (
              <FaStar
                key={index}
                className={index <= (hover || rating) ? "active" : "inactive"}
                onClick={() => handleClick(index)}
                onMouseMove={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave()}
                size={40}
              />
            );
          })}
        </div>
        <p>What can you say about the website and the services it offers?</p>
        <textarea
          rows={7}
          cols={80}
          className="review"
          name="review"
          placeholder="Feel free while giving feedback..."
          style={{
            display: "block",
            margin: "0 auto",
            backgroundColor: "#fff",
          }}
          required
        ></textarea>
        <button type="submit">Submit Feedback</button>
      </form>
      <button
        className="back-button"
        style={{ width: "200px" }}
        onClick={() => window.history.back()}
      >
        Back to Dashboard
      </button>
    </div>
  );
}
