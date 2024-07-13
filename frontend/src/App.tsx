import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Preview from './pages/Preview';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Verification from './pages/Verification';
import UserDetails from './pages/UserDetails';
import PersonalDetails from './pages/PersonalDetails';
import EducationDetails from './pages/EducationDetails';
import AdditionalDetails from './pages/AdditionalDetails';
import HomeStudent from './pages/HomeStudent';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './utils/AuthContext';

const App: React.FC = () => {
  return (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/education-details" element={<EducationDetails />} />
        <Route path="/additional-details" element={<AdditionalDetails />} />
        <Route path="/home-student" element={<HomeStudent />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/campus-tpo-dashboard" element={<Home />} />
          </Route>
      </Routes>
      
    </Router>
    </AuthProvider>
   
  );
};

export default App;
