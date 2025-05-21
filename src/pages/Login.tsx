import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch the website name from env variable
  const siteName = import.meta.env.VITE_SITE_NAME;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', formData);

      if (!response.data.token) {
        throw new Error("Invalid server response. Token missing.");
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setMessage('✅ Login Successful! Redirecting...');
      
      setTimeout(() => navigate('/'), 1500); // Redirect after 1.5 seconds
    } catch (error: any) {
      setMessage(error.response?.data?.message || '❌ Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Display website name as heading outside the login box, centered */}
      <h1 className="text-4xl font-bold text-center text-white mb-8 mt-20">{siteName}</h1>

      <div className="w-96 p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:ring-2 focus:ring-blue-500 transition"
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
              className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <button
            className="w-full py-2 bg-white text-black font-semibold rounded hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{' '}
          <span className="text-white cursor-pointer" onClick={() => navigate('/signup')}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
