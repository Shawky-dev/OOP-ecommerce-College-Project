import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BrowsingPage from './pages/Browsing/Browsing.jsx';
import AAhmed from './AAhmed.jsx';
import Login from './pages/Login/Login.jsx';
import Admin from './pages/Admin/Admin.jsx';

function App() {
 return (
    <div style={{ backgroundColor: '#393E46', height: "100vh" }}>
      <Router>
        <Routes>
          <Route path="/" element={<BrowsingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />

        </Routes>
      </Router>
    </div>
 );
}

export default App;
