<<<<<<< Updated upstream
// File: frontend/src/App.jsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/login'; // ensure component is exported as Login
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
=======
import React, { Suspense, lazy } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> Stashed changes
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Lazy load pages to reduce initial bundle size
const HomePage = lazy(() => import('./pages/HomePage'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/Register'));
const Verify = lazy(() => import('./pages/VerifyEmail'));
const Profile = lazy(() => import('./pages/Profile'));
const CreatePage = lazy(() => import('./pages/CreatePage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));

function App() {
  return (
<<<<<<< Updated upstream
    <AuthProvider>
      {/* Remove the bg prop so that the global style applies */}
      <Box minH="100vh">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<CreatePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </AuthProvider>
=======
    <Box minH="100vh">
      <AuthProvider>
        <ChatProvider>
          <Navbar />
          <Suspense fallback={
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              height="100vh"
            >
              <Spinner 
                size="xl" 
                thickness="4px" 
                speed="0.65s" 
                emptyColor="gray.200" 
                color="blue.500" 
              />
            </Box>
          }>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/map" element={<MapPage />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/messages" element={<ChatPage />} />
              </Route>
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ChatProvider>
      </AuthProvider>
    </Box>
>>>>>>> Stashed changes
  );
}

export default React.memo(App);