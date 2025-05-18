import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ElectionContext, ElectionProvider } from "../contexts/Globalcontext";
import "../styles/voter.css";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

export default function Voter() {
  const navigate = useNavigate();
  const {
    electionType,
    userDetails,
    setUserDetails,
    hasVoted,
    setHasVoted,
    startTime,
    endTime,
  } = useContext(ElectionContext);

  const [facultyReps, setFacultyReps] = useState([]);
  const [classReps, setClassReps] = useState([]);
  const [delegates, setDelegates] = useState([]);
  const [electionName, setElectionName] = useState("");
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  console.log(endTime, startTime);
  async function handleVoting(candidateId) {
    // Logic to handle voting
    if (!hasVoted) {
      try {
        // Mark the user as having voted
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          hasVoted: true,
        })); // Update userDetails in context

        console.log("Sending vote data:", {
          electionType,
          candidateId,
          userId: userDetails._id,
        });
        // Send a POST request to update the vote count
        const response = await axios.post(`${API_URL}/api/vote`, {
          electionType,
          candidateId,
          userId: userDetails._id,
        });

        console.log("Vote response:", response.data);
        toast.success("Vote cast successfully!");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error casting vote.");
      }
    } else {
      toast.error("You have already voted!");
    }
  }
  function handleGiveFeedback() {
    navigate("/feedback");
  }
  function handleViewResults() {
    // Logic to view results
    navigate("/results");
  }
  async function handleLogout() {
    // Logic to handle logout
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the system.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, stay logged in!",
    });

    if (result.isConfirmed) {
      console.log("Logging out.");
      setUserDetails(null); // Clear user details from context
      navigate("/");
      toast.success("Logged out successfully!");
    }
  }
  useEffect(() => {
    async function fetchData() {
      if (!electionType) return;
      try {
        setLoading(true);
        if (userDetails?.hasVoted !== undefined) {
          setHasVoted(userDetails.hasVoted); // Update hasVoted when userDetails changes
        }
        const response = await axios.get(
          `${API_URL}/api/${electionType}`
        );
        if (electionType === "facultyreps") {
          setElectionName("Faculty Reps");
          setFacultyReps(response.data?.aspirants);
        } else if (electionType === "classreps") {
          setElectionName("Class Reps");
          setClassReps(response.data?.aspirants);
        } else if (electionType === "delegates") {
          setElectionName("Delegates");
          setDelegates(response.data?.aspirants);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [electionType, userDetails]);
  return (
    <div className="voter-container">
      <h2>Voter Dashboard</h2>
      <p style={{ textTransform: "capitalize" }}>
        Welcome, {userDetails?.firstname || "Voter"}!
      </p>
      <p>Your Registration Number: {userDetails?.regno || "N/A"}</p>
      <p>Your Faculty: {userDetails?.faculty || "N/A"}</p>

      <p>Election Type: {electionName || "Unknown"}</p>
      <p style={{ display: hasVoted ? "none" : "block" }}>
        Elect Your Preferred Candidate:
      </p>
      <div
        className="aspirant-group"
        style={{ display: hasVoted ? "none" : "block" }}
      >
        {loading ? <p>Loading candidates...</p> : null}
        {electionType === "classreps" && classReps.length > 0 ? (
          classReps
            .filter((aspirant) => aspirant.faculty === userDetails?.faculty)
            .map((candidate, index) => (
              <div className="aspirant" key={index}>
                <p>{candidate.name}</p>
                <button
                  type="button"
                  onClick={() => handleVoting(candidate._id)}
                >
                  Vote
                </button>
              </div>
            ))
        ) : electionType === "facultyreps" && facultyReps.length > 0 ? (
          facultyReps
            .filter((aspirant) => aspirant.faculty === userDetails?.faculty)
            .map((candidate, index) => (
              <div className="aspirant" key={index}>
                <p>{candidate.name}</p>
                <button
                  type="button"
                  onClick={() => handleVoting(candidate._id)}
                >
                  Vote
                </button>
              </div>
            ))
        ) : electionType === "delegates" && delegates.length > 0 ? (
          delegates
            .filter((aspirant) => aspirant.faculty === userDetails?.faculty)
            .map((candidate, index) => (
              <div className="aspirant" key={index}>
                <p>{candidate.name}</p>
                <button
                  type="button"
                  onClick={() => handleVoting(candidate._id)}
                >
                  Vote
                </button>
              </div>
            ))
        ) : (
          <p>No candidates available.</p>
        )}
      </div>
      <div
        className="voter-btn-group"
        style={{ display: hasVoted ? "block" : "none" }}
      >
        <button type="button" onClick={handleGiveFeedback}>
          How would you rate our service?
        </button>
        <button type="button" onClick={handleViewResults}>
          View Results
        </button>
        <button type="button" onClick={handleLogout}>
          LOG OUT
        </button>
      </div>
      <p className="timeline">
        Voting starts at {startTime} and ends at {endTime}
      </p>
    </div>
  );
}
