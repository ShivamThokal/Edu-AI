import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/topics")
      .then((res) => setTopics(res.data))
      .catch((err) => console.error("Topic fetch error:", err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Student!</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1.5 px-4 rounded-md shadow transition duration-200"
          >
            Logout
          </button>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          📚 Available Topics
        </h3>

        {topics.length === 0 ? (
          <p className="text-gray-600">No topics available.</p>
        ) : (
          <div className="space-y-5">
            {topics.map((topic) => (
              <div
                key={topic._id}
                className="border border-gray-200 p-5 rounded-lg shadow-sm bg-gray-100 hover:bg-white transition"
              >
                <h4 className="text-xl font-semibold text-gray-800">{topic.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {topic.subject} | {topic.level}
                </p>

                {topic.imageUrl && (
                  <img
                    src={`/api/admin/uploads/${topic.imageUrl}`}
                    alt={topic.title}
                    className="w-40 rounded shadow mb-2"
                  />
                )}

                {topic.pdfUrl && (
                  <a
                    href={`/api/admin/uploads/${topic.pdfUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 font-medium hover:underline"
                  >
                    📄 View PDF
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
