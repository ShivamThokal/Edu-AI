//client/src/components/StudentTopics.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentTopics = () => {
  const [topics, setTopics] = useState([]);

  const fetchTopics = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/topics");
    setTopics(res.data);
  };

  useEffect(() => { fetchTopics(); }, []);

  return (
    <div>
      <h2>Explore Learning Topics</h2>
      <ul>
        {topics.map(t => (
          <li key={t._id} style={{ marginBottom: "20px" }}>
            <p><strong>{t.level} - {t.subject} - {t.title}</strong></p>
            {t.imageUrl && (
              <img
                src={`http://localhost:5000/api/admin/uploads/${t.imageUrl}`}
                alt="topic"
                style={{ width: "150px", height: "auto", borderRadius: "8px" }}
              />
            )}
            {t.pdfUrl && (
              <div style={{ marginTop: "10px" }}>
                <embed
                  src={`http://localhost:5000/api/admin/uploads/${t.pdfUrl}`}
                  type="application/pdf"
                  width="100%"
                  height="400px"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentTopics;