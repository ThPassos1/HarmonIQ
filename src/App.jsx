import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import Home from '@/pages/Home';
import Upload from '@/pages/Upload';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Pricing from '@/pages/Pricing';

import { AuthProvider } from '@/contexts/AuthContext'; // <-- CORREÇÃO AQUI

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen">
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
