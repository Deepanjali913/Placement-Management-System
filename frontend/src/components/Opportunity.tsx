import React, { useState } from 'react';
import axios from 'axios';
import AutoCompleteCompany from './AutoCompleteCompany';

const Opportunity: React.FC = () => {

  type FormDataType = {
    companyName: string;
    companyDetails: string;
    company_pdf: File | null;
    contactPersonName: string;
    contactPersonEmail: string;
    contactPersonPhone: string;
    jobName: string;
    jobDescription: string;
    job_pdf: File | null;
    registrationDeadline: string;
    location: string;
    packages: string;
    eligibleCampusId: string;
    eligibleProgramId: string;
    eligibilityCriteria: string;
    minPercentage: string;
    minCgpa: string;
    branches: string;
    visitType: string;
    companyRating: string;
  };
  

  const [formData, setFormData] = useState<FormDataType>({
    companyName: '',
    companyDetails: '',
    company_pdf: null,
    contactPersonName: '',
    contactPersonEmail: '',
    contactPersonPhone: '',
    jobName: '',
    jobDescription: '',
    job_pdf: null,
    registrationDeadline: '',
    location: '',
    packages: '',
    eligibleCampusId: '',
    eligibleProgramId: '',
    eligibilityCriteria: '',
    minPercentage: '',
    minCgpa: '',
    branches: '',
    visitType: 'internship',
    companyRating: ''
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setFormData({
          ...formData,
          [name]: files[0]
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAutoCompleteChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    (Object.keys(formData) as (keyof FormDataType)[]).forEach(key => {
      const value = formData[key];
      if (value !== null) {
        data.append(key, value);
      }
    });

    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/upload-opportunity', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          
         
        },
        withCredentials : true
      });
      console.log('Response:', response.data);
      // Handle successful response
    } catch (error) {
      console.error('Error uploading opportunity:', error);
      // Handle error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Opportunity</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">Company Name</label>
            <AutoCompleteCompany
              value={formData.companyName}
              onChange={(value) => handleAutoCompleteChange('companyName', value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="companyDetails" className="block text-gray-700 font-medium mb-2">Company Details</label>
            <textarea
              id="companyDetails"
              name="companyDetails"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter company details"
              value={formData.companyDetails}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="companyPdf" className="block text-gray-700 font-medium mb-2">Company Profile (PDF)</label>
            <input
              type="file"
              id="company_pdf"
              name="company_pdf"
              className="w-full p-2 border border-gray-300 rounded-lg"
              accept=".pdf"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contactPersonName" className="block text-gray-700 font-medium mb-2">Contact Person Name</label>
            <input
              type="text"
              id="contactPersonName"
              name="contactPersonName"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter contact person name"
              value={formData.contactPersonName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contactPersonEmail" className="block text-gray-700 font-medium mb-2">Contact Person Email</label>
            <input
              type="email"
              id="contactPersonEmail"
              name="contactPersonEmail"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter contact person email"
              value={formData.contactPersonEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contactPersonPhone" className="block text-gray-700 font-medium mb-2">Contact Person Phone</label>
            <input
              type="tel"
              id="contactPersonPhone"
              name="contactPersonPhone"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter contact person phone"
              value={formData.contactPersonPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="jobName" className="block text-gray-700 font-medium mb-2">Job Name</label>
            <input
              type="text"
              id="jobName"
              name="jobName"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter job name"
              value={formData.jobName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="jobDescription" className="block text-gray-700 font-medium mb-2">Job Description</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter job description"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="jobPdf" className="block text-gray-700 font-medium mb-2">Job Profile (PDF)</label>
            <input
              type="file"
              id="job_pdf"
              name="job_pdf"
              className="w-full p-2 border border-gray-300 rounded-lg"
              accept=".pdf"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="registrationDeadline" className="block text-gray-700 font-medium mb-2">Registration Deadline</label>
            <input
              type="date"
              id="registrationDeadline"
              name="registrationDeadline"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.registrationDeadline}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter job location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="packages" className="block text-gray-700 font-medium mb-2">Package</label>
            <input
              type="number"
              id="packages"
              name="packages"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter package"
              value={formData.packages}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="eligibleCampusId" className="block text-gray-700 font-medium mb-2">Eligible Campus IDs</label>
            <input
              type="text"
              id="eligibleCampusId"
              name="eligibleCampusId"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter eligible campus IDs (separated by hash)"
              value={formData.eligibleCampusId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="eligibleProgramId" className="block text-gray-700 font-medium mb-2">Eligible Program IDs</label>
            <input
              type="text"
              id="eligibleProgramId"
              name="eligibleProgramId"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter eligible program IDs (separated by hash)"
              value={formData.eligibleProgramId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="eligibilityCriteria" className="block text-gray-700 font-medium mb-2">Eligibility Criteria</label>
            <textarea
              id="eligibilityCriteria"
              name="eligibilityCriteria"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter eligibility criteria"
              value={formData.eligibilityCriteria}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="minPercentage" className="block text-gray-700 font-medium mb-2">Minimum Percentage</label>
            <input
              type="number"
              id="minPercentage"
              name="minPercentage"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter minimum percentage"
              value={formData.minPercentage}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="minCgpa" className="block text-gray-700 font-medium mb-2">Minimum CGPA</label>
            <input
              type="number"
              id="minCgpa"
              name="minCgpa"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter minimum CGPA"
              value={formData.minCgpa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="branches" className="block text-gray-700 font-medium mb-2">Branches</label>
            <input
              type="text"
              id="branches"
              name="branches"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter branches (separated by hash)"
              value={formData.branches}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="visitType" className="block text-gray-700 font-medium mb-2">Visit Type</label>
            <select
              id="visitType"
              name="visitType"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.visitType}
              onChange={handleChange}
              required
            >
              <option value="internship">Internship</option>
              <option value="full-time">Full-time</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="companyRating" className="block text-gray-700 font-medium mb-2">Company Rating</label>
            <input
              type="number"
              id="companyRating"
              name="companyRating"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter company rating"
              value={formData.companyRating}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Opportunity;
