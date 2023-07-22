import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  const handleLogout = () =>{
   localStorage.removeItem('token');
   navigate('/signIn')
  }
  return (
    <div className='text-white text-end bg-purple-500'>
      <button
      onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar
