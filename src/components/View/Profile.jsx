import React, { useState } from 'react';
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


 const verifyEmail = async (e) =>{
  
  try{
    console.log('wait');
    const idToken = localStorage.getItem('token');
  const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDz2JJcOPvQ6aZWZ7JSkBxM2wuUziGzq80',{
   requestType: "VERIFY_EMAIL",
   idToken,
  })
  console.log(response);
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
<motion.div variants={fadeIn("left",'spring',0.5,1)}>
<button
onClick={verifyEmail}
>verify</button>
{sent &&( <motion.p 

className='text-white  '>You will receive an verification code on your email</motion.p>)}

</motion.div>
)
}
export default SectionWrapper(Profile, 'profile');