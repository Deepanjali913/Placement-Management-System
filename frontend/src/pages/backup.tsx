import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Switch from '../components/Switch';

const Preview: React.FC = () => {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [switches, setSwitches] = useState({
    candidateName: false,
    emailId: false,
    mobileNo: false
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { registrationId } = location.state || { registrationId: '' }; // Fallback if registrationId is not provided

  useEffect(() => {
    if (!registrationId) {
      navigate('/'); // Redirect to home if no registrationId
      return;
    }

    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user-details?registrationId=${registrationId}`);
        setDetails(response.data);
        setCandidateName(response.data.candidate_name);
        setEmailId(response.data.email_id);
        setMobileNo(response.data.mobile_no);
      } catch (error) {
        console.error('Error fetching user details:', error); // Log the error
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [navigate, registrationId]);

  const handleVerify = async () => {
    try {
      await axios.post('http://localhost:5000/verify-user', { registrationId });
      navigate('/home');
    } catch {
      alert('Failed to verify details. Please try again.');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post('http://localhost:5000/update-details', { registrationId, candidateName, emailId, mobileNo });
      setDetails({ ...details, candidate_name: candidateName, email_id: emailId, mobile_no: mobileNo });
      setEditMode(false);
    } catch {
      alert('Failed to update details. Please try again.');
    }
  };

  const handleSwitchChange = (field: keyof typeof switches) => {
    setSwitches({ ...switches, [field]: !switches[field] });
  };

  const allSwitchesOn = Object.values(switches).every(switchOn => switchOn);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8">Preview Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="space-y-4">
              <div className="flex items-center">
                <p className="mr-2"><strong>Registration ID:</strong> {details.registration_id}</p>
              </div>
              <div className="flex items-center">
                <p className="mr-2"><strong>Candidate Name:</strong>
                  {editMode && !switches.candidateName ? (
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      className="ml-2 p-1 border rounded"
                    />
                  ) : (
                    ` ${details.candidate_name}`
                  )}
                </p>
                <Switch checked={switches.candidateName} onChange={() => handleSwitchChange('candidateName')} />
              </div>
              <div className="flex items-center">
                <p className="mr-2"><strong>Date of Birth:</strong> {details.date_of_birth}</p>
              </div>
              <div className="flex items-center">
                <p className="mr-2"><strong>Email ID:</strong>
                  {editMode && !switches.emailId ? (
                    <input
                      type="email"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      className="ml-2 p-1 border rounded"
                    />
                  ) : (
                    ` ${details.email_id}`
                  )}
                </p>
                <div className="flex items-right">
                  <Switch checked={switches.emailId} onChange={() => handleSwitchChange('emailId')} />
                </div>
              </div>
              <div className="flex items-center">
                <p className="mr-2"><strong>Mobile No:</strong>
                  {editMode && !switches.mobileNo ? (
                    <input
                      type="tel"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                      className="ml-2 p-1 border rounded"
                    />
                  ) : (
                    ` ${details.mobile_no}`
                  )}
                </p>
                <Switch checked={switches.mobileNo} onChange={() => handleSwitchChange('mobileNo')} />
              </div>
              <div className="flex items-center">
                <p className="mr-2"><strong>Adhar No:</strong> {details.adhar_no}</p>
              </div>
              <div className="flex items-center">
                <p className="mr-2"><strong>Course Name:</strong> {details.course_name}</p>
              </div>
              <div className="flex items-center">
                <p className="mr-2"><strong>Exam Group:</strong> {details.exam_group}</p>
              </div>
              <div className="flex items-center">
                <p className="mr-2"><strong>College Name:</strong> {details.college_name}</p>
              </div>
              <div className="flex items-center">
                <p className="mr-2"><strong>Allotted Quota:</strong> {details.allotted_quota}</p>
              </div>
              <div className="flex items-center">
                <p className="mr-2"><strong>HOME/OTHER:</strong> {details.home_other}</p>
              </div>
              <div className="flex items-center">
                <p className="mr-2"><strong>Reported to College:</strong> {details.reported_to_college}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          {editMode ? (
            <button onClick={handleUpdate} className="w-full bg-blue-500 text-white p-4 rounded-lg mr-2">Update</button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className={`w-full bg-blue-500 text-white p-4 rounded-lg mr-2 ${allSwitchesOn ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={allSwitchesOn}
            >
              Edit
            </button>
          )}
          <button onClick={handleVerify} className="w-full bg-blue-500 text-white p-4 rounded-lg" disabled={!allSwitchesOn}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
