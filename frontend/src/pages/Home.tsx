import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import { Menu } from '@headlessui/react';
import Opportunity from '../components/Opportunity';
import Analytics from '../components/Analytics';
import Discipline from '../components/Discipline';
import Query from '../components/Query';
import DataDownload from '../components/DataDownload';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';



const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('opportunity');
  const navigate = useNavigate();
 const {token , setToken} = useAuth();
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/logout', {}, {
        withCredentials: true, // Ensure cookies are included in the request
      });
      localStorage.removeItem('accessToken');
      setToken(null)
      console.log(token);
      console.log(localStorage.getItem('accessToken'))
      
      navigate('/')
    } catch (error) {
      console.error('Error logging out:', error);
      
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleTabSelect = (selectedTab: string) => {
    setActiveTab(selectedTab);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold">Menu</div>
        <nav className="space-y-2">
          <button
            className={`p-4 hover:bg-gray-700 ${activeTab === 'opportunity' ? 'bg-gray-700 text-white' : ''}`}
            onClick={() => handleTabSelect('opportunity')}
          >
            Upload Opportunity
          </button>
          <button
            className={`p-4 hover:bg-gray-700 ${activeTab === 'analytics' ? 'bg-gray-700 text-white' : ''}`}
            onClick={() => handleTabSelect('analytics')}
          >
            Analytics
          </button>
          <button
            className={`p-4 hover:bg-gray-700 ${activeTab === 'discipline' ? 'bg-gray-700 text-white' : ''}`}
            onClick={() => handleTabSelect('discipline')}
          >
            Discipline
          </button>
          <button
            className={`p-4 hover:bg-gray-700 ${activeTab === 'query' ? 'bg-gray-700 text-white' : ''}`}
            onClick={() => handleTabSelect('query')}
          >
            Query
          </button>
          <button
            className={`p-4 hover:bg-gray-700 ${activeTab === 'dataDownload' ? 'bg-gray-700 text-white' : ''}`}
            onClick={() => handleTabSelect('dataDownload')}
          >
            Data Download
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-20" />
            <div>
              <h1 className="text-3xl font-bold">Delhi Skill & Entrepreneurship University</h1>
              <h2 className="text-2xl font-bold">Aryabhatt DSEU Ashok Vihar Campus</h2>
              <h3 className="text-xl font-bold">External Relations & Placement</h3>
            </div>
          </div>
          <Menu as="div" className="relative">
            <Menu.Button className="focus:outline-none">
              <svg className="h-8 w-8 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 5a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 2v8a2 2 0 002 2h6a2 2 0 002-2V7H5zm7 2a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } w-full text-left px-4 py-2 text-gray-700`}
                    onClick={handleProfile}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } w-full text-left px-4 py-2 text-gray-700`}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </header>

        <main className="flex-1 p-8">
          {activeTab === 'opportunity' && <Opportunity />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'discipline' && <Discipline />}
          {activeTab === 'query' && <Query />}
          {activeTab === 'dataDownload' && <DataDownload />}
        </main>
      </div>
    </div>
  );
};

export default Home;
