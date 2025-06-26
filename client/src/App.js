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

  const handleRegisterSuccess = () => {
    setShowRegister(false); // Show login form after registration
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 px-4 py-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 drop-shadow-sm tracking-wide mb-10">
        EduAI Platform
      </h1>

      {!isLoggedIn ? (
        <div className="max-w-lg mx-auto">
          {showRegister ? (
            <>
              <Register onRegisterSuccess={handleRegisterSuccess} />
            
            </>
          ) : (
            <>
              <Login onLogin={handleLogin} toggleForm={() => setShowRegister(true)} />
              {/* Optional: Add text below login if needed */}
            </>
          )}
        </div>
      ) : role === "admin" ? (
        <AdminDashboard />
      ) : (
        <StudentDashboard />
      )}
    </div>
  );
}

export default App;
