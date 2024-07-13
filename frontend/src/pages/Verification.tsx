import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verification: React.FC = () => {
  const [mobileNo, setMobileNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [otpSent, setOtpSent] = useState({ mobile: false, email: false });
  const [otpMobile, setOtpMobile] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [verified, setVerified] = useState({ mobile: false, email: false });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSendOtpMobile = async () => {
    try {
      await axios.post('http://localhost:5000/send-otp', { mobileNo });
      setOtpSent(prevState => ({ ...prevState, mobile: true }));
    } catch {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleSendOtpEmail = async () => {
    try {
      await axios.post('http://localhost:5000/send-email-otp', { emailId });
      setOtpSent(prevState => ({ ...prevState, email: true }));
    } catch {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtpMobile = async () => {
    try {
      await axios.post('http://localhost:5000/verify-otp', { mobileNo, otp: otpMobile });
      setVerified(prevState => ({ ...prevState, mobile: true }));
    } catch {
      setError('Invalid or expired OTP');
    }
  };

  const handleVerifyOtpEmail = async () => {
    try {
      await axios.post('http://localhost:5000/verify-email-otp', { emailId, otp: otpEmail });
      setVerified(prevState => ({ ...prevState, email: true }));
    } catch {
      setError('Invalid or expired OTP');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Verification</h2>
        <div className="flex justify-between mb-4">
          <label className="block text-gray-700">Mobile No.</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg mr-2"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
          {!verified.mobile && (
            <button
              onClick={handleSendOtpMobile}
              className="w-half bg-blue-500 text-white p-2 rounded-lg mt-2"
            >
              Send OTP
            </button>
          )}
          {otpSent.mobile && !verified.mobile && (
            <>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={otpMobile}
                onChange={(e) => setOtpMobile(e.target.value)}
              />
              <button
                onClick={handleVerifyOtpMobile}
                className="w-full bg-green-500 text-white p-2 rounded mt-2"
              >
                Verify OTP
              </button>
            </>
          )}
          {verified.mobile && (
            <p className="text-green-500 mt-2">Mobile number verified <span>&#10003;</span></p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email ID</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          {!verified.email && (
            <button
              onClick={handleSendOtpEmail}
              className="w-full bg-blue-500 text-white p-2 rounded mt-2"
            >
              Send OTP
            </button>
          )}
          {otpSent.email && !verified.email && (
            <>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={otpEmail}
                onChange={(e) => setOtpEmail(e.target.value)}
              />
              <button
                onClick={handleVerifyOtpEmail}
                className="w-full bg-green-500 text-white p-2 rounded mt-2"
              >
                Verify OTP
              </button>
            </>
          )}
          {verified.email && (
            <p className="text-green-500 mt-2">Email ID verified <span>&#10003;</span></p>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {verified.mobile && verified.email && (
          <button
            onClick={() => navigate('/change-password', { state: { heading: 'Create New Password' } })}
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Verification;
