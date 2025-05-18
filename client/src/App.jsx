import { useState } from "react";
import "./App.css";
import Login from "./components/login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Voter from "./components/voter";
import Admin from "./components/admin";
import Results from "./components/results";
import NotFound from "./components/notfound";
import Feedback from "./components/feedback";
import Reviews from "./components/reviews";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{backgroundColor:"green", width:"100vw", margin:"0 auto", height:"80px", paddingTop:"10px"}}>Zalendo Voting System</h1>
      </header>
     

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/voter" element={<Voter />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/results" element={<Results />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer>
        <p>&copy; 2025 Campus Voting System</p>
      </footer>
    </div>
  );
}

export default App;
