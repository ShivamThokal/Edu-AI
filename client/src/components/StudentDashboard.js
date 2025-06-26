import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/topics")
      .then(res => setTopics(res.data))
      .catch(err => console.error("Topic fetch error:", err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Welcome Student!</h2>
        <button onClick={handleLogout} className="text-red-600 underline">Logout</button>
      </div>

      <h3 className="text-lg font-semibold mb-4">Available Topics</h3>
      {topics.length === 0 ? (
        <p>No topics available.</p>
      ) : (
        <div className="space-y-4">
          {topics.map(topic => (
            <div key={topic._id} className="border p-4 rounded shadow">
              <h4 className="font-semibold">{topic.title}</h4>
              <p className="text-sm text-gray-600">{topic.subject} | {topic.level}</p>
              {topic.imageUrl && (
                <img
                  src={`/api/admin/uploads/${topic.imageUrl}`}
                  alt={topic.title}
                  className="w-48 mt-2 rounded"
                />
              )}
              {topic.pdfUrl && (
                <a
                  href={`/api/admin/uploads/${topic.pdfUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-blue-600 underline"
                >
                  📄 View PDF
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
