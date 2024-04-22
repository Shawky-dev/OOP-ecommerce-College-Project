import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BrowsingPage from './pages/Browsing/Browsing.jsx';
import AAhmed from './AAhmed.jsx';
import Login from './pages/Login/Login.jsx';

function App() {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [isCustomer, setIsCustomer] = useState(false);

 useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const customer = localStorage.getItem('isCustomer');
    setIsLoggedIn(loggedIn ? JSON.parse(loggedIn) : false);
    setIsCustomer(customer ? JSON.parse(customer) : false);
 }, []);

 const handleLogin = (isLoggedIn, isCustomer) => {
    setIsLoggedIn(isLoggedIn);
    setIsCustomer(isCustomer);
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('isCustomer', JSON.stringify(isCustomer));
 };

 const handleLogout = () => {
    setIsLoggedIn(false);
    setIsCustomer(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isCustomer');
 };

 return (
    <div style={{ backgroundColor: '#393E46', height: "100vh" }}>
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <BrowsingPage /> : <Navigate to="/Login" />} />
          <Route path="/Login" element={<Login onLogin={handleLogin} onLogout={handleLogout} />} />
        </Routes>
      </Router>
    </div>
 );
}

export default App;
