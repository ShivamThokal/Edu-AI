import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "./LogoutButton";

function AdminDashboard() {
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState({
    level: "",
    subject: "",
    title: "",
    image: null,
    pdf: null,
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
        "Content-Type": "multipart/form-data",
      },
    });
    setForm({ level: "", subject: "", title: "", image: null, pdf: null });
    fetchTopics();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/admin/topics/${id}`, {
      headers: { Authorization: token },
    });
    fetchTopics();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Admin Dashboard – Manage Topics
        </h2>
        <LogoutButton />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl mx-auto mb-10"
      >
        <input
          name="level"
          placeholder="Level"
          value={form.level}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          name="image"
          onChange={handleInputChange}
          className="w-full"
        />
        <input
          type="file"
          name="pdf"
          onChange={handleInputChange}
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Topic
        </button>
      </form>

      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Topics</h3>
        {topics.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-bold">{t.title}</h4>
              <button
                onClick={() => handleDelete(t._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {t.subject} / {t.level}
            </p>
            {t.imageUrl && (
              <div className="mb-2">
                <img
                  src={`/api/admin/uploads/${t.imageUrl}`}
                  alt="preview"
                  className="w-32 rounded"
                />
              </div>
            )}
            {t.pdfUrl && (
              <div>
                <a
                  href={`/api/admin/uploads/${t.pdfUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View PDF
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
