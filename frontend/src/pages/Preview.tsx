import React, { useState } from 'react';
import Switch from '../components/Switch';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Preview: React.FC = () => {
  const location = useLocation();
  const { userDetails } = location.state as { userDetails: any };
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [rollNo, setRollNo] = useState(userDetails.rollNo);
  const [name, setName] = useState(userDetails.name);
  const [dob, setDob] = useState(userDetails.dob);
  const [fathersName, setFathersName] = useState(userDetails.fathersName);
  const [branch, setBranch] = useState(userDetails.branch);
  const [workExperience, setWorkExperience] = useState(userDetails.workExperience);
  const [hobbies, setHobbies] = useState(userDetails.hobbies);
  const [interests, setInterests] = useState(userDetails.interests);
  const [address, setAddress] = useState(userDetails.address);
  const [drivingLicence, setDrivingLicence] = useState(userDetails.drivingLicence);
  const [twoWheeler, setTwoWheeler] = useState(userDetails.twoWheeler);
  const [switches, setSwitches] = useState({
    rollNo: false,
    name: false,
    dob: false,
    fathersName: false,
    branch: false,
    workExperience: false,
    hobbies: false,
    interests: false,
    address: false,
    drivingLicence: false,
    twoWheeler: false,
  });

  const handleSwitchChange = (field: keyof typeof switches) => {
    setSwitches({ ...switches, [field]: !switches[field] });
  };

  const handleUpdate = async () => {
    const updatedDetails = {
      rollNo,
      name,
      dob,
      fathersName,
      branch,
      workExperience,
      hobbies,
      interests,
      address,
      drivingLicence,
      twoWheeler,
    };

    try {
      await axios.post('http://localhost:5000/update-details', updatedDetails);
      Object.assign(userDetails, updatedDetails);
      setEditMode(false);
    } catch (error) {
      alert('Failed to update details. Please try again.');
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleNext = () => {
    navigate('/home-student');
  };

  const allSwitchesOn = Object.values(switches).every((switchOn) => switchOn);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold text-black-600 mb-6">Preview Page</h2>
        <div className="mb-6">
          <img
            src="./logo.png"
            alt="User"
            className="w-32 h-32 object-cover rounded-full mx-auto"
          />
        </div>
        <div className="space-y-6">
          {[
            { label: 'Roll No', value: rollNo, setValue: setRollNo, field: 'rollNo' },
            { label: 'Name', value: name, setValue: setName, field: 'name' },
            { label: 'Date of Birth', value: dob, setValue: setDob, field: 'dob' },
            { label: "Father's Name", value: fathersName, setValue: setFathersName, field: 'fathersName' },
            { label: 'Branch', value: branch, setValue: setBranch, field: 'branch' },
            { label: 'Work Experience', value: workExperience, setValue: setWorkExperience, field: 'workExperience' },
            { label: 'Hobbies', value: hobbies, setValue: setHobbies, field: 'hobbies' },
            { label: 'Interests', value: interests, setValue: setInterests, field: 'interests' },
            { label: 'Address', value: address, setValue: setAddress, field: 'address' },
            { label: 'Driving Licence', value: drivingLicence, setValue: setDrivingLicence, field: 'drivingLicence' },
            { label: 'Two Wheeler', value: twoWheeler, setValue: setTwoWheeler, field: 'twoWheeler' },
          ].map(({ label, value, setValue, field }) => (
            <div key={field} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between mb-4">
              <div className="w-3/4">
                <p className="text-left">
                  <strong>{label}:</strong>
                  {editMode && !switches[field as keyof typeof switches] ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="ml-2 p-1 border rounded w-full"
                    />
                  ) : (
                    ` ${value}`
                  )}
                </p>
              </div>
              <div className="w-1/4 flex justify-end">
                <Switch checked={switches[field as keyof typeof switches]} onChange={() => handleSwitchChange(field as keyof typeof switches)} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          {editMode ? (
            <>
              <button
                className={`px-4 py-2 text-white rounded ${allSwitchesOn ? 'bg-green-500' : 'bg-gray-500 cursor-not-allowed'}`}
                disabled={!allSwitchesOn}
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded"
                onClick={handleNext}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
