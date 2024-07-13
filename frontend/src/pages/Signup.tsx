import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup: React.FC = () => {
  const [registrationId, setRegistrationId] = useState('');
  const [adharNo, setAdharNo] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/verify-signup', { registrationId, adharNo, rollNo });
      if (response.data.success) {
        navigate('/verify');
      } else {
        setError('Verification failed. Please check your details and try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Registration ID</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Adhar No.</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={adharNo}
            onChange={(e) => setAdharNo(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Roll No.</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Next
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 bg-gray-500 text-white p-2 rounded"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
