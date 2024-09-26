import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    f_userName: "",
    f_Pwd: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      onLogin();
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
    <ToastContainer />
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Sign In</h2>
        {message && <p className="alert alert-info text-center">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="f_userName" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="f_userName"
              name="f_userName"
              placeholder="Enter your username"
              onChange={handleChange}
              value={formData.f_userName}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="f_Pwd" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="f_Pwd"
              name="f_Pwd"
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.f_Pwd}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Do not have an account?{" "}
            <Link to="/signup" className="text-primary fw-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
