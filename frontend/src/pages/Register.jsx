import React, { useState } from "react";
import userAPI from "../APIs/UserAPI";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import '../Styling.css';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Function to get the register the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await userAPI.register(formData);
      setFormData({ name: "", email: "", password: "", address: "" });
      toast(data.Message);
      // Navigating the user after 1.5 sec to login 
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 1800);
    } catch (error) {
      console.error("Registration failed:", error);
      toast(error.response.data.Message);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div>
      {/* Registration form */}
      <div id="login">
        <div className="wrapper">
          <form action="">
            <h1>Register</h1>
            <div className="input-box">
              {/* Input field for first name */}
              <input type="text" id="name" placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required />
            </div>
            <div className="input-box">
              {/* Input field for E-mail */}
              <input type="email" id="email" placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              {/* Input field for password */}
              <input type="password" id="password" placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                } required />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="input-box">
              {/* Input field for last name */}
              <input type="text" id="lastName" placeholder="Address(place)"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required />
            </div>
            {/* Button for registration */}
            <button type="submit" id="login-button" className="btn"
              onClick={(e) => {
                handleSubmit(e); // Call register function on button click 
              }}>
              {/* Conditional rendering of button text based on loading state */}

              {loading ? (
                <span>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                  <span role="status">Loading...</span>
                </span>
              ) : (
                "Register"
              )}</button>
            <div className="register-link">
              <p>Already Registered!<Link to="/login">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
