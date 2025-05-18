import { useContext, useEffect, useState } from "react";
import { ElectionContext } from "../contexts/Globalcontext";
import axios from "axios";
import "../styles/results.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

export default function Results() {
  // State to hold the election results
  const [results, setResults] = useState([]);
  const [electionName, setElectionName] = useState("");
  const { electionType } = useContext(ElectionContext);
  const API_URL = process.env.REACT_APP_API_URL;
  const faculties = [
    "Computing and Information Technology",
    "Engineering",
    "Media and Communication",
    "Business and Commerce",
    "Social Sciences and Technology",
    "Science and Technology",
  ];
  console.log("Election Type:", electionType);

  async function fetchResults() {
    try {
      const response = await axios.get(
        `${API_URL}/api/results?electionType=${electionType}`
      );
      setResults(response.data.results);
      console.log("Fetched results:", response.data.results);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  }

  // Call the fetchResults function when the component mounts
  // to fetch the election results from the server
  useEffect(() => {
    if (!electionType) return; // Exit if electionType is not set
    fetchResults();
    if (electionType === "facultyreps") {
      setElectionName("Faculty Reps");
    } else if (electionType === "classreps") {
      setElectionName("Class Reps");
    } else if (electionType === "delegates") {
      setElectionName("Delegates");
    }
  }, [electionType]);

  return (
    <div className="results-container">
      <h2>Election Results</h2>
      <p className="electype">Election Type: {electionName || "Unknown"}</p>
      <div className="results-card-container">
        {faculties.map((faculty, index) => (
          <div className="results-card" key={index}>
            <h3 style={{ color: "#000000" }}>{faculty}</h3>
            {results && results.length ? (
              results
                .filter((result) => result.faculty === faculty)
                .map((result) => (
                  <div className="results-aspirant" key={result._id}>
                    <p className="results-name">{result.name}</p>
                    <p className="results-votes">
                      Votes: <span>{result.votes}</span>
                    </p>
                  </div>
                ))
            ) : (
              <p>No results available for this faculty.</p>
            )}
          </div>
        ))}
      </div>
      
      <button className="reload-button" onClick={fetchResults}>
        <FontAwesomeIcon icon={faRedo} /> Reload for Latest Results
      </button>
      
      <button className="back-button" onClick={() => window.history.back()}>
        Back to Dashboard
      </button>
    </div>
  );
}
