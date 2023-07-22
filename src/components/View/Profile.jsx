import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';

const Profile = () =>{
 const [verified, setVerified] = useState(false);
 const [error, setError] = useState(false);
 const [sent, setSent] = useState(false);
 const navigate =useNavigate();
 const idToken = localStorage.getItem('token');

 const verifyEmail = async (e) =>{
  e.preventDefault();
  try{
  const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDz2JJcOPvQ6aZWZ7JSkBxM2wuUziGzq80',{
   requestType:"VERIFY_EMAIL",
   idToken
  })
  if(response.status === 200){
    setSent(true);
    setVerified(!verified);
  }
}catch(error){
    console.log(error);
    setError('something went wrong')
}
 }


return(
<>
<button
onClick={verifyEmail}
>verify</button>
{sent &&( <motion.p 
variants={fadeIn("right","string",0.2,1)}
className='text-white text-center '>You will receive an verification code on your email</motion.p>)}
</>
)
}
export default SectionWrapper(Profile, 'profile');