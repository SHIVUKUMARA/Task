import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ isLoggedIn, onLogout }) => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:5000/api/users/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setLoggedInUser(data.userName);
          } else {
            console.error(data.message);
            setLoggedInUser("");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchLoggedInUser();
    }
  }, [isLoggedIn]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/signin");
  };

  return (
    <>
      <header className="header bg-dark text-white py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="d-inline ms-3">Your Logo</h1>
        </div>
      </header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info d-flex flex-direction-row">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-dark d-flex align-items-center">
          <li className="nav-item px-4">
            <Link className="nav-link text-dark fw-bold" to="/">
              Home
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item dropdown">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Create Employee
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
                style={{ zIndex: 1050 }}
              >
                <li>
                  <Link className="dropdown-item" to="/EmployeeManagement">
                    Create Employees
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/EmployeeList">
                    Employee List
                  </Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
        <div className="d-flex align-items-center px-4">
          {isLoggedIn ? (
            <>
              <span className="navbar-text me-3 text-dark fw-bold px-4">
                {loading ? "Loading..." : loggedInUser || "Error fetching user"}
              </span>
              <button
                className="btn btn-outline-danger fw-bold"
                onClick={handleSignOut}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/signin" className="btn btn-outline-danger fw-bold">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
