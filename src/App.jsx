import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Register from './pages/Register';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ element: Element }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return <Element />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
