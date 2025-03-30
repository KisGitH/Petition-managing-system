import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminsNavbar from '../components/AdminsNavbar';
import Department from '../components/Department';
import Page404 from '../components/Page404';
import LoginPage from './LoginPage';
import QuickAccess from '../components/QuickAccess';
import DashBoard from '../components/DashBoard';

const AdminPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("isLoggedIn") === "true");

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
    };
  
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  

  return (
    <>
      <AdminsNavbar />
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} /> 
            <Route path="*" element={<Page404 />} />
          </>
        ) : (
          <>
            <Route path="/department" element={<Department />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/quickaccess" element={<QuickAccess />} />
            <Route path="*" element={<Page404 />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AdminPage;
