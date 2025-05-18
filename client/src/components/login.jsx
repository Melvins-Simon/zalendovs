import { Link, useNavigate } from "react-router-dom";
import Register from "./register";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ElectionContext } from "../contexts/Globalcontext";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(ElectionContext);

  async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = event.target.email.value;
    const password = event.target.password.value;
    const category = event.target.category.value;
    const API_URL = process.env.REACT_APP_API_URL;
    console.log(API_URL);
    try {
      // Make a POST request to the login API
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
        category,
      });

      // Handle successful login
      const user = response.data.user;
      setUserDetails(user); // Set user details in context
      toast.success(
        `${category} login successful! Redirecting to the dashboard.`
      );
      navigate(`/${category}`); // Redirect to the appropriate dashboard
    } catch (error) {
      // Handle errors
      toast.error(error.response.data.message);
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-logo-container">
        <img src="/218557985.png" alt="Logo" className="logo" />
      </div>
      <div className="login-details-container">
        <h2>Welcome to the Campus Voting System</h2>
        <p>Your one-stop solution for secure and efficient voting.</p>
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-form-group">
            <label htmlFor="login-email">Email</label>
            <input type="email" id="loginemail" name="email" required />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="loginpassword"
              name="password"
              required
            />
          </div>
          <div className="login-form-group">
            <span>Category:</span>
            <label htmlFor="admin">Admin</label>
            <input
              type="radio"
              id="admin"
              name="category"
              value="admin"
              required
            />
            <label htmlFor="voter">Voter</label>
            <input
              type="radio"
              id="voter"
              name="category"
              value="voter"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
