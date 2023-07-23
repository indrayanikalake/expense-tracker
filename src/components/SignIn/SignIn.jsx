import { useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { styles } from '../../styles';
import { slideIn } from '../../utils/motion';
import { SectionWrapper } from '../../hoc';
import {  useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

const SignIn = () => {
    const navigate = useNavigate();
    const { update } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const confirmPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;
    const cnfmPassword = confirmPassword.current.value;
    
    if (password !== cnfmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDz2JJcOPvQ6aZWZ7JSkBxM2wuUziGzq80', {
        email,
        password,
        returnSecureToken: true,
      });
      setLoading(false);
      if (response.status === 200) {
       
        console.log('User has successfully signed in');
        console.log(response.data.idToken);
        localStorage.setItem('token',response.data.idToken);
        update(response.data.idToken);

        enteredEmail.current.value='';
        enteredPassword.current.value='';
        confirmPassword.current.value='';
        navigate('/signIn/expense');
       
      } else {
        console.log('Failed to sign In');
      }
    } catch (error) {
      console.log(error.message);
    }

    
  };

  const handleForgotPassword = ()=>{
    navigate('/resetPassword')
  }

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className='flex-[0.95] text-start bg-black-100 p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <label className='flex flex-col '>
            <span className='text-white  font-medium mb-4'>
              Email
            </span>
            <input 
              type='email'
              name='email'
              ref={enteredEmail}
              placeholder='your name please...'
              className='bg-tertiary py-4 px-6
              placeholder:text-secondary
              text-white rounded-lg outlined-none border-none font-medium'
              required
            />
          </label>
          <label className='flex flex-col '>
            <span className='text-white font-medium mb-4'>
              Password
            </span>
            <input 
              type='password'
              name='password'
              ref={enteredPassword}
              placeholder='your email please...'
              className='bg-tertiary py-4 px-6
              placeholder:text-secondary
              text-white rounded-lg outlined-none border-none font-medium'
             required/>
          </label>
          <label className='flex flex-col '>
            <span className='text-white font-medium mb-4'>
              Confirm Password
            </span>
            <input 
              type='password'
              name='confirmPassword'
              ref={confirmPassword}
              placeholder='Confirm your password...'
              className='bg-tertiary py-4 px-6
              placeholder:text-secondary
              text-white rounded-lg outlined-none border-none font-medium'
           required />
          </label>
          {error && <div className='text-red-500'>{error}</div>}
          <button type='button' onClick={handleForgotPassword}
          className='outline-none text-white text-center'>Forgot Password</button>
          <button type='submit' className='bg-tertiary py-3 px-8 outline-none shadow-md shadow-primary font-bold text-white rounded-xl'>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(SignIn, 'signIn');

