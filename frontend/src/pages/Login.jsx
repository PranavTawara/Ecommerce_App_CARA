import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import userAPI from "../APIs/UserAPI";
import { setToken } from "../slices/AuthSlice";
import { setUser } from "../slices/UserSlice";
import '../Styling.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Function to handle user login
  const login = async () => {
    setLoading(true);
    try {
      const response = await userAPI.login(userData);
      dispatch(setUser(response.user));
      dispatch(setToken(response.token));
      toast(response.Message);
      setLoading(false);
      setTimeout(() => {
        // Navigation to allproducts page, after completion of toastify toast
        navigate("/allproducts");
      }, 1700);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast(error.response.data.Message);
    }
  };

  return (
    <div>
      <div id="login">
        <div className="wrapper">
          <form action="">
            <h1>Login</h1>
            <div className="input-box">
              <input type="email" id="email" placeholder="E-mail" value={userData.email}
                onChange={(e) =>
                  setUserData(() => ({
                    ...userData,
                    email: e.target.value,
                  }))
                } required />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input type="password" id="password" placeholder="Password" value={userData.password}
                onChange={(e) =>
                  setUserData(() => ({
                    ...userData,
                    password: e.target.value,
                  }))
                } required />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="remember-forgot">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" id="login-button" className="btn"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}>
              {/* Loading component to tell the user, API is calling here... (Please Wait) */}

              {loading ? (
                <span>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </button>
            <div className="register-link">
              <p>Don't have an account?<Link to="/register">Register</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
