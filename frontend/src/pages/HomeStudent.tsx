import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import logo from './logo.png';

const HomeStudent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'opportunity':
        return <div className="p-4 bg-blue-100 text-blue-700 rounded">No companies available</div>;
      case 'assessment':
        return <div className="p-4 bg-blue-100 text-blue-700 rounded">No assessments available</div>;
      case 'interview':
        return <div className="p-4 bg-blue-100 text-blue-700 rounded">No interviews available</div>;
      default:
        return <div className="p-4">Please select an option from the menu</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarVisible ? 'block' : 'hidden'
        } w-64 bg-gray-800 text-white flex flex-col fixed md:relative md:block`}
      >
        <div className="p-4 text-2xl font-bold">Menu</div>
        <div className="flex flex-col md:flex-col md:items-center">
          <button
            className="p-4 hover:bg-gray-700"
            onClick={() => setActiveSection('opportunity')}
          >
            Opportunity
          </button>
          <button
            className="p-4 hover:bg-gray-700"
            onClick={() => setActiveSection('assessment')}
          >
            Assessment
          </button>
          <button
            className="p-4 hover:bg-gray-700"
            onClick={() => setActiveSection('interview')}
          >
            Interview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64 md:ml-0">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              className="block md:hidden focus:outline-none"
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            >
              <svg
                className={`h-8 w-8 text-gray-700 transition-transform transform ${
                  isSidebarVisible ? 'rotate-90' : 'rotate-0'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 9a1 1 0 100-2 1 1 0 000 2zM10 13a1 1 0 100-2 1 1 0 000 2zM10 17a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </button>
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
                <path d="M10 9a1 1 0 100-2 1 1 0 000 2zM10 13a1 1 0 100-2 1 1 0 000 2zM10 17a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-gray-100' : ''} w-full text-left px-4 py-2 text-gray-700`}
                    onClick={handleProfile}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-gray-100' : ''} w-full text-left px-4 py-2 text-gray-700`}
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
          <h2 className="text-2xl font-bold mb-4">Welcome to the Placement Portal</h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default HomeStudent;
