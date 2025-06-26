import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "./LogoutButton"; // ⬅️ Import reusable logout

function AdminDashboard() {
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState({
    level: "",
    subject: "",
    title: "",
    image: null,
    pdf: null
  });

  const token = localStorage.getItem("token");

  const fetchTopics = async () => {
    const res = await axios.get("/api/admin/topics");
    setTopics(res.data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("level", form.level);
    formData.append("subject", form.subject);
    formData.append("title", form.title);
    if (form.image) formData.append("image", form.image);
    if (form.pdf) formData.append("pdf", form.pdf);

    await axios.post("/api/admin/topics", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data"
      }
    });
    setForm({ level: "", subject: "", title: "", image: null, pdf: null });
    fetchTopics();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/admin/topics/${id}`, {
      headers: { Authorization: token }
    });
    fetchTopics();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Admin Dashboard – Manage Topics</h2>
        <LogoutButton />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          name="level"
          placeholder="Level"
          value={form.level}
          onChange={handleInputChange}
        /><br /><br />
        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleInputChange}
        /><br /><br />
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
        /><br /><br />
        <input type="file" name="image" onChange={handleInputChange} /><br /><br />
        <input type="file" name="pdf" onChange={handleInputChange} /><br /><br />
        <button type="submit">Add Topic</button>
      </form>

      <hr />

      <h3>Topics</h3>
      {topics.map((t) => (
        <div key={t._id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <strong>{t.title}</strong> - {t.subject} / {t.level}
          {t.imageUrl && (
            <div>
              <img src={`/api/admin/uploads/${t.imageUrl}`} alt="preview" width={100} />
            </div>
          )}
          {t.pdfUrl && (
            <div>
              <a href={`/api/admin/uploads/${t.pdfUrl}`} target="_blank" rel="noreferrer">View PDF</a>
            </div>
          )}
          <button onClick={() => handleDelete(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
