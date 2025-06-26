import React, { useState } from "react";
import './App.css';

import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);
  const role = localStorage.getItem("role");

  const handleLogin = (userRole) => {
    localStorage.setItem("role", userRole);
    setIsLoggedIn(true);
  };

  return (
    <div>
      <h1>EduAI Platform</h1>

      {!isLoggedIn ? (
        <>
          {showRegister ? (
            <>
              <Register onRegisterSuccess={() => setShowRegister(false)} />
              <p>
                Already registered?{" "}
                <button onClick={() => setShowRegister(false)}>Login</button>
              </p>
            </>
          ) : (
            <>
              <Login onLogin={handleLogin} />
              <p>
                New student?{" "}
                <button onClick={() => setShowRegister(true)}>Register</button>
              </p>
            </>
          )}
        </>
      ) : role === "admin" ? (
        <AdminDashboard />
      ) : (
        <StudentDashboard />
      )}
    </div>
  );
}

export default App;
