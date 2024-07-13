import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EducationDetails: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [qualificationType, setQualificationType] = useState('');
  const [boardOrUniversity, setBoardOrUniversity] = useState('');
  const [marksAchieved, setMarksAchieved] = useState('');
  const [yearOfPassing, setYearOfPassing] = useState('');
  const [schoolOrCollegeName, setSchoolOrCollegeName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [schoolOrCollegeCity, setSchoolOrCollegeCity] = useState('');
  const [qualificationData, setQualificationData] = useState<{
    type: string;
    boardUniversity: string;
    marks: string;
    year: string;
    schoolCollegeName: string;
    branch: string;
    schoolCollegeCity: string;
  }[]>([]);
  
  
  const validateScore = (marksAchieved: string) => {
    const value = parseFloat(marksAchieved);
    return value > 10 && value <= 100;
  };

  const handleAddQualification = () => {
    if (
      qualificationType &&
      boardOrUniversity &&
      marksAchieved &&
      yearOfPassing &&
      schoolOrCollegeName &&
      branchName&&
      schoolOrCollegeCity
    ) {
      setQualificationData([
        ...qualificationData,
        {
          type: qualificationType,
          boardUniversity: boardOrUniversity,
          marks: marksAchieved,
          year: yearOfPassing,
          schoolCollegeName: schoolOrCollegeName,
          branch: branchName,
          schoolCollegeCity: schoolOrCollegeCity,
        },
      ]);

      setQualificationType('');
      setBoardOrUniversity('');
      setMarksAchieved('');
      setYearOfPassing('');
      setSchoolOrCollegeName('');
      setBranchName('');
      setSchoolOrCollegeCity('');
    } else {
      alert('Please fill all the required fields.');
    }
  };

  const handleDeleteQualification = (index: number) => {
    const updatedQualifications = [...qualificationData];
    updatedQualifications.splice(index, 1);
    setQualificationData(updatedQualifications);
  };

  const handleNext = async () => {
    if (qualificationData.every((qual) => validateScore(qual.marks))) {
      try {
        const response = await axios.post('http://localhost:5000/api/education-details', {
          rollNo: state.rollNo,
          qualifications: qualificationData,
        });
        if (response.status === 200) {
          navigate('/additional-details', {
            state: {
              ...state,
              qualifications: qualificationData,
            },
          });
        } else {
          throw new Error('Failed to save education details');
        }
      } catch (error) {
        console.error('Error saving education details:', error);
        alert('Failed to save education details');
      }
    } else {
      alert('Please fill all the fields with valid scores.');
    }
  };


  const qualificationFields = qualificationData.map((qualification, index) => (
    <tr key={index}>
      <td className="py-2 px-4">{index + 1}</td> 
      <td className="py-2 px-4">{qualification.type}</td>
      <td className="py-2 px-4">{qualification.boardUniversity}</td>
      <td className="py-2 px-4">{qualification.marks}</td>
      <td className="py-2 px-4">{qualification.year}</td>
      <td className="py-2 px-4">{qualification.schoolCollegeName}</td>
      <td className="py-2 px-4">{qualification.branch}</td>
      <td className="py-2 px-4">{qualification.schoolCollegeCity}</td>
      <td className="py-2 px-4">
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => handleDeleteQualification(index)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1h2a1 1 0 0 1 0 2h-1v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9H4a1 1 0 0 1 0-2h2V5zm4 2h2v7H9V7zm3-2H8v1h4V5z"
            />
          </svg>
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container mx-auto bg-gray-100 p-10 rounded-lg shadow-lg sm:max-w-5xl">
      <h1 className="text-2xl font-bold text-center mb-4">Education Details</h1>

      <div className="flex flex-wrap">
        <div className="w-full mt-4">
          <label className="block text-gray-700">Qualification</label>
          <select
            className="w-full p-2 border rounded"
            value={qualificationType}
            onChange={(e) => setQualificationType(e.target.value)}
          >
            <option value="">Select Qualification</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="ITI">ITI</option>
            <option value="Diploma">Diploma</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
          </select>
        </div>

        {qualificationType && (
          <>
            <div className="w-1/2 pr-4 mt-4">
              <label className="block text-gray-700">Board/University</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={boardOrUniversity}
                onChange={(e) => setBoardOrUniversity(e.target.value)}
              />
            </div>
            <div className="w-1/4 pr-4 mt-4">
              <label className="block text-gray-700">Marks Achieved (%)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={marksAchieved}
                onChange={(e) => setMarksAchieved(e.target.value)}
              />
            </div>
            <div className="w-1/4 pr-4 mt-4">
              <label className="block text-gray-700">Year of Passing</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={yearOfPassing}
                onChange={(e) => setYearOfPassing(e.target.value)}
              />
            </div>
            <div className="w-1/2 pr-4 mt-4">
              <label className="block text-gray-700">School/College Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={schoolOrCollegeName}
                onChange={(e) => setSchoolOrCollegeName(e.target.value)}
              />
            </div>
            <div className="w-1/4 pr-4 mt-4">
              <label className="block text-gray-700">Subjects/Branch</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
              />
            </div>
            <div className="w-1/4 pr-4 mt-4">
              <label className="block text-gray-700">School/College City</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={schoolOrCollegeCity}
                onChange={(e) => setSchoolOrCollegeCity(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddQualification}
              >
                Add
              </button>
            </div>
          </>
        )}
      </div>

      {qualificationData.length > 0 && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">Added Educational Information</h2>
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">S.No.</th>
                <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">Type</th>
                <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">Board/University</th>
                <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">Marks (%)</th>
                <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">Year of Passing</th>
                <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">School/College Name</th>
                <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">Branch</th>
                <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">School/College City</th>
                <th className="w-1/8 text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {qualificationFields}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EducationDetails;
