import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'

const UsersNavbar = () => {

  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  }
  
 useEffect(() => {
  if(menu){
    document.body.style.overflow = 'hidden'
  }
  else{
    document.body.style.overflow = 'auto'
  }
  return () => {
    document.body.style.overflow = 'auto'
  }
 }, [menu])

  return (
    <nav className='
    fixed top-0 left-0 right-0 z-10
    flex justify-between items-center 
    bg-white text-black
    border-b-1 border-[#1F9BEE] shadow-sm
    px-5 md:px-10 py-2'>
        <img src={assets.UserPageLogo} alt="Logo" className='w-20'/>
        <ul className='hidden md:flex space-x-10 text-lg '>
            <li>Home</li>
            <li>Add Petition</li>
            <li>Petition Status</li>
            <li>About</li>
        </ul>
        { menu && <ul className='md:hidden w-full h-fit py-5 bg-[#1f9bee] text-white fixed top-13.5 right-0 flex flex-col items-center gap-5 transition-all duration-75 rounded-b-xl border-b-2 border-black'>
            <li className='text-xl font-medium w-full text-center '>Home</li>
            <li className='text-xl font-medium w-full text-center '>Add Petition</li>
            <li className='text-xl font-medium w-full text-center '>Petition Status</li>
            <li className='text-xl font-medium w-full text-center '>About</li>
        </ul>}
        <img src={assets.MenuIcon} alt="Menu" className='w-8 md:hidden' onClick={toggleMenu}/>
    </nav>
  )
}

export default UsersNavbar