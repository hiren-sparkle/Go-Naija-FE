import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const siteName = import.meta.env.VITE_SITE_NAME;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'success') {
      setMessage('✅ Email verified successfully! You can now log in.');
    } else if (status === 'expired') {
      setMessage('⚠️ Verification link expired. Please request a new one.');
    } else {
      setMessage('❌ Invalid verification link.');
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
    {/* Display website name as heading outside the login box, centered */}
    <h1 className="text-4xl font-bold text-center text-white mb-8 mt-20">{siteName}</h1>

    <div className="w-96 p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
        <p className="text-lg">{message}</p>

        {status === 'success' && (
          <button 
            onClick={() => navigate('/login')}
            className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          >
            Go to Login
          </button>
        )}

        {status === 'expired' && (
          <button 
            onClick={() => navigate('/resend-verification')}
            className="mt-4 w-full py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition"
          >
            Resend Verification Email
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
