import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';

const AdminsNavbar = () => {
  const [menu, setMenu] = useState(false);
  const [adminName, setAdminName] = useState(sessionStorage.getItem("adminName") || "");
  const navigate = useNavigate();

  const toggleMenu = () => setMenu(!menu);

  const handleLogout = () => {
    sessionStorage.clear();
    window.dispatchEvent(new Event("storage")); // Notify other components
    navigate("/admin/");
    window.location.reload();
  };
  
  

  useEffect(() => {
    const handleStorageChange = () => {
      setAdminName(sessionStorage.getItem("adminName") || "");
    };
  
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  

  return (
    <nav className='fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-white text-black border-b-1 border-[#1F9BEE] shadow-sm px-5 md:px-10 py-2'>
      <img src={assets.Logo} alt="Logo" className='w-20' />

      <ul className='hidden md:flex space-x-10 text-lg'>
        <Link to="/admin/department" className='hover:text-[#1f9bee] transform hover:scale-110 transition ease-in-out duration-250'>Departments</Link>
        <Link to="/admin/dashboard" className='hover:text-[#1f9bee] transform hover:scale-110 transition ease-in-out duration-250'>Dashboard</Link>
        <Link to="/admin/quickaccess" className='hover:text-[#1f9bee] transform hover:scale-110 transition ease-in-out duration-250'>QuickAccess</Link>
      </ul>

      { menu && 
          <ul className='md:hidden w-full h-fit bg-[#1f9bee] text-black fixed top-13.5 right-0 flex flex-col items-center rounded-b-xl border-b-2 border-black'>
            <Link to="/admin/department" className='text-xl font-medium w-full text-center border-b-1 py-4'>Departments</Link>
            <Link to="/admin/dashboard" className='text-xl font-medium w-full text-center border-b-1 py-4'>Dashboard</Link>
            <Link to="/admin/quickaccess" className='text-xl font-medium w-full text-center py-4'>QuickAccess</Link>
          </ul>
        }

      <div className='flex flex-row items-center gap-5'>
        {adminName ? (
          <>
            <div className='w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-lg font-medium'>
              {adminName.substring(0, 2).toUpperCase()}
            </div>
            <button onClick={handleLogout} className='px-4 py-1 border bg-red-500 text-white font-medium rounded-4xl hover:bg-white hover:border-red-500 hover:text-red-500 transition ease-in-out duration-500'>
              Logout
            </button>
          </>
        ) : (
          <Link to="/admin/" className='right-0 px-4 py-1 border bg-[#1f9bee] text-lg text-white font-medium rounded-4xl hover:bg-white hover:border-[#1f79ee] hover:text-[#1f79ee] transition ease-in-out duration-500'>
            LOGIN
          </Link>
        )}

        <img src={assets.MenuIcon} alt="Menu" className='w-8 md:hidden' onClick={toggleMenu}/>
        
      </div>
    </nav>
  );
};

export default AdminsNavbar;
