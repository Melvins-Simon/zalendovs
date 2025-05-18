import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ElectionContext, ElectionProvider } from "../contexts/Globalcontext";
import "../styles/admin.css";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function Admin() {
  const {
    electionType,
    setElectionType,
    duration,
    setDuration,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    userDetails,
    setUserDetails,
  } = useContext(ElectionContext);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;


  function handleAddElection(event) {
    // Logic to add an election

    event.preventDefault();
    if (electionType) {
      toast.success(
        `${electionType} elections have been set up successfully for ${duration} hours!`
      );
      // Here, you can send election data to your backend (e.g., via an API call)
      console.log(`Adding election for: ${electionType}`);
    } else {
      alert("Please select an election type.");
    }
  }
 
  function handleElectionChange(event) {
    // Logic to handle election type change
    const value = event.target.value;

    console.log("Selected election type:", value);
    if (value === "Class Rep") {
      setElectionType("classreps");
    } else if (value === "Faculty Rep") {
      setElectionType("facultyreps");
    } else if (value === "Student Delegate") {
      setElectionType("delegates");
    }
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
  async function handleReset() {
    // Logic to reset results
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reset it!",
      cancelButtonText: "No, cancel!",
    });
    console.log("Resetting election results.");
    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          `${API_URL}/api/reset`,
          {}
        );
        console.log("Reset response:", response.data);
        toast.success("Results reset successfully!");
      } catch (error) {
        console.error("Error resetting results:", error);
        toast.error("Error resetting results.");
      }
    }
   
  }
  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <p style={{ textTransform: "capitalize" }}>
        Welcome, {userDetails.firstname || "Admin"}
      </p>
      <form className="admin-form" onSubmit={handleAddElection}>
        <div className="admin-form-group">
          <label>Select Election Type:</label>
          <div className="admin-radio-group">
            <label htmlFor="classRep">Class Rep</label>
            <input
              type="radio"
              name="electionType"
              id="classRep"
              value="Class Rep"
              onChange={handleElectionChange}
              checked={electionType === "classreps"}
            />

            <label htmlFor="facultyRep">Faculty Rep</label>
            <input
              type="radio"
              name="electionType"
              id="facultyRep"
              value="Faculty Rep"
              onChange={handleElectionChange}
              checked={electionType === "facultyreps"}
            />

            <label htmlFor="studentDelegate">Student Delegate</label>
            <input
              type="radio"
              name="electionType"
              id="studentDelegate"
              value="Student Delegate"
              onChange={handleElectionChange}
              checked={electionType === "delegates"}
            />
          </div>
        </div>
        <label htmlFor="duration">Set Duration:</label>
        <select
          id="duration"
          name="duration"
          onChange={(e) => {
            const selectedDuration = parseInt(e.target.value, 10);
            setDuration(selectedDuration);

            if (!startTime || isNaN(new Date(startTime).getTime())) {
              console.error("Invalid startTime:", startTime);
              toast.error("Start time is not set or invalid.");
              return;
            }

            console.log("Start date:", startTime);
            let endTime = new Date(
              new Date(startTime).getTime() + selectedDuration * 60 * 60 * 1000
            );

            const formattedEndTime = endTime.toLocaleString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
            });
            setEndTime(formattedEndTime);
            console.log("End date:", formattedEndTime);
          }}
          style={{ marginLeft: "10px" }}
        >
          <option value="5">5 Hours</option>
          <option value="8">8 Hours</option>
          <option value="10">10 Hours</option>
        </select>
        <button type="submit" disabled={!electionType}>
          Add Election
        </button>
      </form>
      <div className="btn-group">
        <button type="button" onClick={() => navigate("/results")}>
          View Results
        </button>
        <button type="button" onClick={() => navigate("/reviews")}>
          View User Feedback
        </button>
        <button type="button" onClick={handleReset}>
          Clear Results
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
