// client/src/components/LogoutButton.js
import React from "react";

function LogoutButton() {
  const handleLogout = () => {
    localStorage.clear(); // Remove token and role
    window.location.reload(); // Reload the app
  };

  return (
    <button onClick={handleLogout} style={{ float: "right", margin: "1rem" }}>
      Logout
    </button>
  );
}

export default LogoutButton;
