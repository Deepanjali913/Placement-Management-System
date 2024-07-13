import React, { useState } from 'react';

const UserDetails: React.FC = () => {
  const [fatherName, setFatherName] = useState('');
  const [permanentAddress, setPermanentAddress] = useState({
    country: '',
    city: '',
    district: '',
    pinCode: ''
  });
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [religion, setReligion] = useState('');
  const [dob, setDob] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [panNo, setPanNo] = useState('');
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [abcId, setAbcId] = useState('');
  const [linkedinId, setLinkedinId] = useState('');
  const [passportNo, setPassportNo] = useState('');
  const [passportExpiryDate, setPassportExpiryDate] = useState('');
  
  const [error, setError] = useState(false);

  const handleNext = () => {
    // Perform validation here as needed
    if (gender === '' || category === '') {
      setError(true);
    } else {
      setError(false);
      // Proceed to the next step
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">User Details</h2>
        
        {/* Father's Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Father's Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
        </div>

        {/* Permanent Address */}
        <div className="mb-4">
          <label className="block text-gray-700">Permanent Address</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Country"
              className="w-1/3 p-2 mr-2 border border-gray-300 rounded"
              value={permanentAddress.country}
              onChange={(e) => setPermanentAddress({ ...permanentAddress, country: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              className="w-1/3 p-2 mr-2 border border-gray-300 rounded"
              value={permanentAddress.city}
              onChange={(e) => setPermanentAddress({ ...permanentAddress, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="District"
              className="w-1/3 p-2 border border-gray-300 rounded"
              value={permanentAddress.district}
              onChange={(e) => setPermanentAddress({ ...permanentAddress, district: e.target.value })}
            />
          </div>
          <input
            type="text"
            placeholder="Pin Code"
            className="w-full mt-2 p-2 border border-gray-300 rounded"
            value={permanentAddress.pinCode}
            onChange={(e) => setPermanentAddress({ ...permanentAddress, pinCode: e.target.value })}
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="general">General</option>
            <option value="obc">OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
          </select>
        </div>

        {/* Religion */}
        <div className="mb-4">
          <label className="block text-gray-700">Religion</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        {/* Aadhar Number */}
        <div className="mb-4">
          <label className="block text-gray-700">Aadhar Number</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
          />
        </div>

        {/* PAN Number */}
        <div className="mb-4">
          <label className="block text-gray-700">PAN Number</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={panNo}
            onChange={(e) => setPanNo(e.target.value)}
          />
        </div>

        {/* Driving License Number */}
        <div className="mb-4">
          <label className="block text-gray-700">Driving License Number</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={drivingLicenseNo}
            onChange={(e) => setDrivingLicenseNo(e.target.value)}
          />
        </div>

        {/* ABC ID */}
        <div className="mb-4">
          <label className="block text-gray-700">ABC ID</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={abcId}
            onChange={(e) => setAbcId(e.target.value)}
          />
        </div>

        {/* LinkedIn Profile ID */}
        <div className="mb-4">
          <label className="block text-gray-700">LinkedIn Profile ID</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={linkedinId}
            onChange={(e) => setLinkedinId(e.target.value)}
          />
        </div>

        {/* Photograph in PNG */}
        <div className="mb-4">
          <label className="block text-gray-700">Photograph (PNG)</label>
          <input
            type="file"
            accept="image/png"
            className="w-full p-2 border border-gray-300 rounded"
            // Handle file upload logic here
          />
        </div>

        {/* Passport Number */}
        <div className="mb-4">
          <label className="block text-gray-700">Passport Number</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={passportNo}
            onChange={(e) => setPassportNo(e.target.value)}
          />
        </div>

        {/* Passport Expiry Date */}
        <div className="mb-4">
          <label className="block text-gray-700">Passport Expiry Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={passportExpiryDate}
            onChange={(e) => setPassportExpiryDate(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500">Please fill out all required fields.</p>}
        
        <button
          onClick={handleNext}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
