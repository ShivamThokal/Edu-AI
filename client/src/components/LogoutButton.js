import React from "react";

function LogoutButton() {
  const handleLogout = () => {
    localStorage.clear(); // Clear token and role
    window.location.reload(); // Reload the app
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-1.5 px-4 rounded-md shadow transition duration-200"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
