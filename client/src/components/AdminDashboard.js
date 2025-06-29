import React, { useState } from 'react';
import LogoutButton from './LogoutButton';
import { storage } from '../firebaseConfig'; 
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    level: '',
    subject: ''
  });
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !pdf) {
      setMessage("❌ Please upload both an image and a PDF.");
      return;
    }

    setLoading(true);

    const storageRef = ref(storage, `uploads/${Date.now()}-_-${image.name.replace(/\s/g, '-')}`);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    setImage(downloadURL);
    const storageRef2 = ref(storage, `uploads/${Date.now()}-_-${pdf.name.replace(/\s/g, '-')}`);
    await uploadBytes(storageRef2, pdf);
    const downloadURL2 = await getDownloadURL(storageRef2);
    setPdf(downloadURL2);
    // alert("File uploaded!");

    const form = new FormData();
    form.append('title', formData.title);
    form.append('level', formData.level);
    form.append('subject', formData.subject);
    form.append('imageUrl', downloadURL);
    form.append('pdfUrl', downloadURL2);
    // form.append('image', image);
    // form.append('pdf', pdf);

    try {
      
      const response = await fetch('http://localhost:5000/api/admin/addTopic', {
        method: 'POST',
        body: form
      });

      const data = await response.json();

      if (response) {
        setMessage('✅ Topic created successfully!');
        setFormData({ title: '', level: '', subject: '' });
        setImage(null);
        setPdf(null);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Add New Topic</h2>
      <LogoutButton/>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Level</label>
          <input
            type="text"
            placeholder="e.g., CET / NEET / Beginner"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Subject</label>
          <input
            type="text"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Image File</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">PDF File</label>
          <input
            type="file"
            accept="application/pdf/image"
            onChange={(e) => setPdf(e.target.files[0])}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-300"
        >
          {loading ? 'Uploading...' : 'Create Topic'}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default AdminDashboard;
