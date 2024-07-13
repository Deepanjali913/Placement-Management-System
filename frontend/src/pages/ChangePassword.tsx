import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ChangePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { registrationId } = location.state as { registrationId: string };

  const handleChangePassword = async () => {
    if (newPassword === '' || confirmPassword === '') {
      setError('Passwords cannot be empty');
    } else if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
    } else if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      try {
        await axios.post('http://localhost:5000/change-password', { registrationId, newPassword });
        navigate('/');
        alert('Password has been changed Successfully. Please login again with your new password.')
      } catch (err: unknown) {
        setError('An error occurred while updating the password');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Create Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleChangePassword}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
