import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const siteName = import.meta.env.VITE_SITE_NAME;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/signup', formData);
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
    {/* Display website name as heading outside the login box, centered */}
    <h1 className="text-4xl font-bold text-center text-white mb-8 mt-20">{siteName}</h1>

    <div className="w-96 p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-white"
              required
            />
          </div>
          <button className="w-full py-2 bg-white text-black font-semibold rounded hover:opacity-90 transition">
            Sign Up
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-400">{message}</p>}
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <span className="text-white cursor-pointer" onClick={() => navigate('/login')}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
