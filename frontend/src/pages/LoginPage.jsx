import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from "lucide-react";

const LoginPage = ({ setIsLoggedIn }) => {  // Accept setIsLoggedIn as a prop
  const [showPassword, setShowPassword] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_id: adminId, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store login session
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("adminName", adminId);
        window.dispatchEvent(new Event("storage")); // Notify other components


        setIsLoggedIn(true);  // Update state immediately
        navigate("/admin/department"); // Navigate to the department page
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className='w-full h-screen bg-[#86daf6] px-10 py-4'>
      <div className='w-full h-full pt-15 flex items-center justify-center'>
        <form className='h-full md:w-3/4 px-4 bg-[#ebe9e97e] rounded-lg flex flex-col items-center justify-center gap-4'
          onSubmit={handleLogin}>
          
          <div className='mb-5 text-3xl text-[#055861] font-bold'>Admin Login</div>
          
          <div className='w-[80%] md:w-1/2 flex gap-2 border-2 rounded-lg'>
            <label className='text-center bg-[#95ccde] rounded-l-md text-nowrap border-r-2 py-2 px-5'>Admin ID</label>
            <input type="text" name='userId' value={adminId} onChange={(e) => setAdminId(e.target.value)}
              className='outline-none w-full p-2' required />
          </div>

          <div className='w-[80%] md:w-1/2 flex gap-2 border-2 rounded-lg'>
            <label className='text-left bg-[#95ccde] rounded-l-md border-r-2 px-5 py-2'>Password</label>
            <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className='outline-none w-full p-2' required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className='rounded-r-md p-2'>
              {showPassword ? <EyeOffIcon size={24} /> : <EyeIcon size={24} />}
            </button>
          </div>

          <div className='mt-5'> 
            <button type="submit" className='border-2 py-2 px-8.5 bg-[#2f939e] rounded-lg font-medium hover:bg-[#b1ebf1]'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
