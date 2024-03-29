import { useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { styles } from '../../styles';
import { slideIn } from '../../utils/motion';
import { SectionWrapper } from '../../hoc';
import {  Link, useNavigate } from 'react-router-dom';
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
      const response = await axios.post('http://localhost:7000/user/login', {
        email,
        password,
      
      });
      setLoading(false);
      if (response.status === 200) {
        console.log(response.data);
        console.log('User has successfully signed in');
        console.log(response.data.token);
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('email', response.data.email);
        update(response.data.token);

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
    <div className='xl:mt-0 xl:flex-row flex-col-reverse flex gap-1 overflow-hidden'>
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className='flex-[0.95] text-start bg-black-100 p-1 rounded-2xl'>
        <Link to='/signUp' className={`${styles.sectionSubText}`}>Create an Account</Link>
        <h3 className={styles.sectionHeadText}>Sign In</h3>
        <form onSubmit={handleSubmit} className='mt-1 flex flex-col gap-2'>
          <label className='flex flex-col '>
            <span className='text-white  font-medium mb-4'>
              Email
            </span>
            <input 
              type='email'
              name='email'
              ref={enteredEmail}
              placeholder='your name please...'
              className='bg-transparent py-4 px-6
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
              className='bg-transparent py-4 px-6
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
              className='bg-transparent py-4 px-6
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

