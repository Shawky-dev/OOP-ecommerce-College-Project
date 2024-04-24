import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BrowsingPage from './pages/Browsing/Browsing.jsx';
import Login from './pages/Login/Login.jsx';
import Settings from './pages/Settings/Settings.jsx';
import { AddItem } from './pages/Item/AddItem.jsx';
import EditItem from './pages/Item/EditItem.jsx';
import Cart  from './pages/Cart/Cart.jsx';

function App() {
 return (
    <div style={{ backgroundColor: '#393E46', height: "100vh" }}>
      <Router>
        <Routes>
          <Route path="/" element={<BrowsingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={ <Settings/>} />
          <Route path='/additem' element={<AddItem/>}/>
          <Route path='/edititem/:id' element={<EditItem/>}/>
          <Route path='cart' element={<Cart/>}/>
          
        </Routes>
      </Router>
    </div>
 );
}

export default App;
