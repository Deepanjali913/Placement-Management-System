import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
  const [username, setUsername] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/send-otp', { rollNo: username });
      setOtpSent(true);
    } catch {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('http://localhost:5000/verify-otp', { rollNo: username, otp });
      navigate('/change-password', { state: { rollNo: username } });
    } catch {
      setError('Invalid or expired OTP');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        {!otpSent ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <p>OTP has been sent to your registered mobile number.</p>
            <div className="mb-4 mt-4">
              <label className="block text-gray-700">Enter OTP</label>
              <input
                type="text"
                className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
