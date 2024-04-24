import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminSettings from './AdminSettings';
import CustomerSettings from './CustomerSettings';

const Settings = () => {

    const getUserID = () => {
        return localStorage.getItem('id');
    };


    const getUserRole = () => {
        return localStorage.getItem('role');
    };
  return (
    <div>
         {getUserRole() === 'customer' ? (
             <CustomerSettings id = {getUserID()}/>
        ) : (
            <AdminSettings id ={getUserID()}/>
                    )}
    </div>
  )
}

export default Settings