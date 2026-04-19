import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Home from './pages/Home';
import TermPage from './pages/TermPage';
import Admin from './pages/Admin';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/term/:id" element={<TermPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
