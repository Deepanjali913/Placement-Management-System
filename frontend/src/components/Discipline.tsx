import React, { useState } from 'react';
import axios from 'axios';

interface DisciplineForm {
  studentName: string;
  rollNumber: string;
  studentBranch : string ;
 
}

const Discipline: React.FC = () => {
  const [formData, setFormData] = useState<DisciplineForm>({
    studentName: '',
    rollNumber: '',
    studentBranch: ''
    
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/discipline/block', formData, {
        withCredentials: true,
      });
      console.log('Response:', response.data);
      // Handle successful response
    } catch (error) {
      console.error('Error updating discipline status:', error);
      // Handle error
    }
  };

  const handleMarkPlaced = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/discipline/mark-placed', formData, {
        withCredentials: true,
      });
      console.log('Response:', response.data);
      // Handle successful response
    } catch (error) {
      console.error('Error updating discipline status:', error);
      // Handle error
    }
  };

  const handleMarkActive = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/discipline/mark-active', formData, {
        withCredentials: true,
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error updating discipline status:', error);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl ">
        <h2 className="text-2xl font-bold mb-6 text-center">Discipline Student</h2>
        <form >
          <div className="mb-4">
            <label htmlFor="studentName" className="block text-gray-700 font-medium mb-2">Student Name</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter student name"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="rollNumber" className="block text-gray-700 font-medium mb-2">Roll Number</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter roll number"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="studentBranch" className="block text-gray-700 font-medium mb-2">Student Branch</label>
            <input
              type="text"
              id="studentBranch"
              name="studentBranch"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter student branch"
              value={formData.studentBranch}
              onChange={handleChange}
              required
            />
          </div>

         

          <button
            type="button"
            onClick={handleBlock}
            className="w-full bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Block
          </button>
          <button
            type="button"
            onClick={handleMarkPlaced}
            className="w-full bg-green-500 text-white mt-4 font-medium py-2 px-4 rounded-lg hover:bg-green -600 transition duration-200"
          >
            Mark Placed
          </button>
          <button
            type="button"
            onClick={handleMarkActive}
            className="w-full bg-blue-500 text-white mt-4 font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Mark Active
          </button>
        </form>
      </div>
    </div>
  );
};

export default Discipline;
