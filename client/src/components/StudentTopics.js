import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentTopics = () => {
  const [topics, setTopics] = useState([]);

  const fetchTopics = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/topics");
    setTopics(res.data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📘 Explore Learning Topics
        </h2>
        <ul className="space-y-6">
          {topics.map((t) => (
            <li
              key={t._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {t.level} — {t.subject} — {t.title}
              </p>

              {t.imageUrl && (
                <img
                  src={`http://localhost:5000/api/admin/uploads/${t.imageUrl}`}
                  alt="topic"
                  className="w-40 rounded-md mb-4 border"
                />
              )}

              {t.pdfUrl && (
                <div className="mt-4">
                  <embed
                    src={`http://localhost:5000/api/admin/uploads/${t.pdfUrl}`}
                    type="application/pdf"
                    className="w-full h-[400px] rounded border"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentTopics;
