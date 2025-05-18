import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();
  async function handleRegistration(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const faculty = event.target.faculty.value;
    const regno = event.target.regno.value;
    const API_URL = process.env.REACT_APP_API_URL;
    
    try {
      const response = await axios.post(`${API_URL}/api/signup`, {
        firstname,
        lastname,
        email,
        password,
        faculty,
        regno,
      });
      console.log(response.data.registered_user);

      setTimeout(() => {
        toast.success(response.data.message);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  // Logic to handle registration
  return (
    <div className="reg-container">
      <h2>Register</h2>
      <form className="reg-form" onSubmit={handleRegistration}>
        <div className="reg-form-group">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" name="firstname" required />
        </div>
        <div className="reg-form-group">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" name="lastname" required />
        </div>
        <div className="reg-form-group">
          <label htmlFor="reg-email">Email Address</label>
          <input type="email" id="reg-email" name="email" required />
        </div>
        <div className="reg-form-group">
          <label htmlFor="reg-password">Password</label>
          <input
            type="password"
            id="reg-password"
            name="password"
            minLength={8}
            maxLength={12}
            required
          />
        </div>
        <div className="reg-form-group">
          <label htmlFor="faculty">Select Your Faculty</label>
          <select id="faculty" name="faculty" required>
            <option value="Computing and Information Technology">
              Computing and Information Technology
            </option>
            <option value="Business and Commerce">Business and Commerce</option>
            <option value="Engineering">Engineering</option>
            <option value="Social Sciences and Technology">
              Social Sciences and Technology
            </option>
            <option value="Science and Technology">
              Science and Technology
            </option>
            <option value="Media and Communication">
              Media and Communication
            </option>
          </select>
        </div>
        <div className="reg-form-group">
          <label htmlFor="regno">Registration Number</label>
          <input
            type="text"
            id="regno"
            name="regno"
            minLength={11}
            placeholder="e.g. CIT-111-222/2030"
            pattern="^[A-Za-z]{3}-\d{3}-\d{3}/\d{4}$"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
