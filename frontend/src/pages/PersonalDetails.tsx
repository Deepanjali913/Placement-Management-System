import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PersonalDetails: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [fathersName, setFathersName] = useState('');
  const [branch, setBranch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { rollNo } = location.state as { rollNo: number };

  
  
  const handleNext = async () => {
    if (name && dob && fathersName && branch) {
      const formData = new FormData();
      formData.append('rollNo', String(rollNo));
      formData.append('name', name);
      formData.append('dob', dob);
      formData.append('fathersName', fathersName);
      formData.append('branch', branch);
      if (photo) {
        formData.append('photo', photo);
      }
      
      try {
        await axios.post('http://localhost:5000/api/candidates', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate('/education-details', {
          state: { rollNo, photo, name, dob, fathersName, branch },
        });
      } catch (error) {
        console.error('Error inserting data:', error);
        alert('Error inserting data');
      }
    } else {
      alert('Please fill all the fields');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Personal Details</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Photo</label>
          <input type="file" onChange={handlePhotoUpload} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Father's Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={fathersName}
            onChange={(e) => setFathersName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Branch</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
        </div>
        <button
          onClick={handleNext}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
