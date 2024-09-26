import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Layout/Header";
import SignUp from "./Components/User/SignUp";
import SignIn from "./Components/User/SignIn";
import SignOut from "./Components/User/SignOut";
import EmployeeManagement from "./Components/Employee/EmployeeManagement";
import EmployeeList from "./Components/Employee/EmployeeList";
import UpdateEmployee from "./Components/Employee/UpdateEmployee";
import DeleteEmployee from "./Components/Employee/DeleteEmployee";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
          <Route
            path="/EmployeeManagement"
            element={
              isLoggedIn ? <EmployeeManagement /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/EmployeeList"
            element={isLoggedIn ? <EmployeeList /> : <Navigate to="/signin" />}
          />
          <Route
            path="/EmployeeManagement/update/:id"
            element={
              isLoggedIn ? <UpdateEmployee /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/delete-employee"
            element={
              isLoggedIn ? <DeleteEmployee /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/signout"
            element={
              isLoggedIn ? (
                <SignOut onLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => (
  <div>
    <h1 className="bg-warning text-left py-2 px-4 w-100">DashBoard</h1>
    <h1 style={{ textAlign: "center", marginTop: "30vh" }}>
      Welcome to the Admin Panel!
    </h1>
  </div>
);

export default App;
