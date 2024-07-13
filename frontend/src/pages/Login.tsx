import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import { useAuth } from '../utils/AuthContext';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const {setToken} = useAuth();
  const navigate = useNavigate();
  

  // const handleLogin = async () => {
  //   setError(null);
  //   try {
  //     const response = await axios.post('http://localhost:5000/login', { rollNo, password, isAdmin });
  //     const next = response.data.next;
  //     console.log('Login response:', response.data); // Debugging log
  //     if (next === 'personal-details') {
  //       navigate('/personal-details', { state: { rollNo } });
  //     }
  //   } catch (err: unknown) {
  //     if (axios.isAxiosError(err) && err.response) {
  //       setError(err.response.data);
  //     } else {
  //       setError('An error occurred. Please try again.');
  //     }
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/login', { email, password },{
        withCredentials: true
      });
      console.log(response)
      const { user , accessToken,refreshToken, role } = response.data.data;
      console.log(role)
      // Save token to localStorage or context
      localStorage.setItem('accesstoken', accessToken);
      setToken(accessToken)
      // Redirect based on role
      switch (role) {
        case 'University_TPO':
          navigate('/university-tpo-dashboard');
          break;
        case 'Zone_TPO':
          navigate('/zone-tpo-dashboard');
          break;
        case 'CAMPUS_TPO':
          navigate('/campus-tpo-dashboard');
          break;
        case 'Proctor':
          navigate('/proctor-dashboard');
          break;
        case 'Student':
          navigate('/student-dashboard');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md">
        <img src={logo} alt="Exam Portal Logo" className="mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-center mb-4">Placement Portal</h2>
        <div className="mb-4">
          <label className="block text-gray-700">{isAdmin ? 'Email' : 'Roll No'}</label>
          <input
            type="text"
            className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded-3xl"
        >
          Sign In
        </button>
         {!isAdmin && <button
          onClick={() => navigate('/signup')}
          className="w-full mt-4 bg-green-500 text-white p-2 rounded-3xl"
        >
          Register
        </button>}
        <div className="flex justify-between mt-4">
          <button onClick={() => setIsAdmin(!isAdmin)} className="text-blue-500">
            {isAdmin ? 'Are you a student?' : 'Are you an admin?'}
          </button>
          {!isAdmin && <button onClick={() => navigate('/forgot-password')} className="text-blue-500">Forgot Password?</button>}
        </div>
      </div>
    </div>
  );
};

export default Login;
