import React, { useRef , useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, slideIn } from '../../utils/motion';
import { SectionWrapper } from '../../hoc';
import { styles } from '../../styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { github, mobile } from '../../assets';

const View = () => {
    const navigate = useNavigate();
    const userName = useRef();
    const photoUrl = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
   const idToken = localStorage.getItem('token')
   console.log(idToken);

    const handleSubmit =async (e) =>{
     e.preventDefault();
     const name = userName.current.value;
     const photo = photoUrl.current.value;
     
     setLoading(true);
     try{
       console.log('wait');
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDz2JJcOPvQ6aZWZ7JSkBxM2wuUziGzq80',{
            idToken,    
            name,
            photo,
          
            returnSecureToken:true,
        })
        setLoading(false);
        console.log(response);
        if(response.status === 200){
            console.log('Done');
            userName.current.value='';
            photoUrl.current.value='';
           navigate('/profile');
           localStorage.setItem('isProfileComplete', true);
        }
     }catch(error){
        console.log(error);
        setError(error);
     }


    }

  return (
    
    <div>
      <h1 className='text-white text-start text-w-[28px]'>Winners never quit, Quiters never win</h1>
      <h1 className='text-white text-end text-w-[28px]'>Your Profile is 64% completed, A couple profile has higher
      chances of landing a job 
      <Link to='/view'>Complete now</Link></h1>
      <h3 className={`${styles.heroHeadText}`}>Details.</h3>
      <motion.div
      variants={fadeIn("up","tween",0.2,1)}>
      
     <form onSubmit={handleSubmit}
     className='flex flex-col bg-black text-white  mt-12 p-8 rounded-[5px] '
     
      >
        <label className='mt-2 p-8' >
            <span className='flex flex-row items-cnter justify-center'>
               <img src={github} alt='github' 
                 className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
                /> 
                Full name:</span>
            <input
             type='text'
             name='name'
             ref={userName}
             placeholder='Your name please..'
             className='bg-gold py-4 px-12
             placeholder:text-white
             text-white rounded-lg outlined-none border-none font-medium'
             required
            />
        </label>
        <label className='mt-2 p-8'>
            <span className='flex flex-row items-center justify-center'>
            <img src={mobile} alt='github' 
                 className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
                /> Profile photo url</span>
            <input
             type='text'
             name='name'
             ref={photoUrl}
             placeholder='Your profile url..'
             className='bg-gold py-4 px-12
             placeholder:text-white
             text-white rounded-lg outlined-none border-none font-medium'
             required
            />
        </label>
        <button type='submit'
        className='mt-2 p-8 bg-gold'
        >update</button>
     </form>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(View, 'view');
