import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AdditionalDetails: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [workExperience, setWorkExperience] = useState('');
  const [interests, setInterests] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [address, setAddress] = useState('');
  const [packageAmounts, setPackageAmounts] = useState<string[]>([]);
  const [relocate, setRelocate] = useState('');
  const [higherStudy, setHigherStudy] = useState('');
  const [entrepreneurship, setEntrepreneurship] = useState('');
  const [governmentExam, setGovernmentExam] = useState('');
  const [interestedPlacement, setInterestedPlacement] = useState('');
  const [drivingLicence, setDrivingLicence] = useState('');
  const [twoWheeler, setTwoWheeler] = useState('');

  const handleCheckboxChange = (value: string) => {
    if (packageAmounts.includes(value)) {
      setPackageAmounts(packageAmounts.filter((item) => item !== value));
    } else if (packageAmounts.length < 2) {
      setPackageAmounts([...packageAmounts, value]);
    }
  };

  const handleSubmit = () => {
    if (
      workExperience &&
      interests &&
      hobbies &&
      address &&
      drivingLicence &&
      twoWheeler &&
      packageAmounts.length > 0
    ) {
      const userDetails = {
        ...state,
        workExperience,
        interests,
        hobbies,
        address,
        drivingLicence,
        twoWheeler,
        packageAmounts,
      };
      console.log('Final User Details:', userDetails);
      axios.post('http://localhost:5000/api/additional-details', userDetails)
        .then(response => {
          console.log('Server response:', response.data);
          navigate('/preview', { state: { userDetails } });
        })
        .catch(error => {
          console.error('Error submitting data:', error);
          alert('Error submitting data');
        });
    } else {
      alert('Please fill all the fields and select at least one package amount');
    }
  };

  const isChecked = (value: string) => packageAmounts.includes(value);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Additional Information</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Work Experience (Internship details must)</label>
          <textarea
            className="w-full p-2 border rounded"
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Interests</label>
          <textarea
            className="w-full p-2 border rounded"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hobbies</label>
          <textarea
            className="w-full p-2 border rounded"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <textarea
            className="w-full p-2 border rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Are you willing to relocate?</label>
          <select
            className="w-full p-2 border rounded"
            value={relocate}
            onChange={(e) => setRelocate(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">YES</option>
            <option value="No">NO</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Are you interested in higher studies?</label>
          <select
            className="w-full p-2 border rounded"
            value={higherStudy}
            onChange={(e) => setHigherStudy(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">YES</option>
            <option value="No">NO</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Entrepreneurship / Business Idea</label>
          <select
            className="w-full p-2 border rounded"
            value={entrepreneurship}
            onChange={(e) => setEntrepreneurship(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">YES</option>
            <option value="No">NO</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Are you preparing for Government Examination?</label>
          <select
            className="w-full p-2 border rounded"
            value={governmentExam}
            onChange={(e) => setGovernmentExam(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">YES</option>
            <option value="No">NO</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Are you interested in placement?</label>
          <select
            className="w-full p-2 border rounded"
            value={interestedPlacement}
            onChange={(e) => setInterestedPlacement(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">YES</option>
            <option value="No">NO</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Driving Licence</label>
          <select
            className="w-full p-2 border rounded"
            value={drivingLicence}
            onChange={(e) => setDrivingLicence(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">YES</option>
            <option value="No">Nope</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Two Wheeler</label>
          <select
            className="w-full p-2 border rounded"
            value={twoWheeler}
            onChange={(e) => setTwoWheeler(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">YES</option>
            <option value="No">NO</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">What is your expected amount of package (in Lakh per Annum)</label>
          <div className="flex flex-wrap">
            {['1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8'].map((range) => (
              <label key={range} className="block w-1/4 p-2">
                <input
                  type="checkbox"
                  value={range}
                  checked={isChecked(range)}
                  onChange={() => handleCheckboxChange(range)}
                  disabled={
                    !isChecked(range) && packageAmounts.length >= 2
                  }
                  className="mr-2"
                />
                {range}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdditionalDetails;
