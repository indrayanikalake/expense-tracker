import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { styles } from '../../styles';
import { slideIn } from '../../utils/motion';
import { SectionWrapper } from '../../hoc';
import { useNavigate , Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
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
   console.log(email);
   console.log(password);
    try {
      const response = await axios.post('http://localhost:7000/user', {
        email,
        password,
        
      });
      setLoading(false);
      
      if (response.status === 200) {
       
        console.log('User has successfully signed up');
        enteredEmail.current.value='';
        enteredPassword.current.value='';
        confirmPassword.current.value='';
       navigate('/signIn');
      } else {
        console.log('Failed to sign up');
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }

    
  };

  return (
    <div className='xl:mt-0 xl:flex-row  h-[480px] flex-col-reverse flex gap-5 '>
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className='flex-[0.95] text-start  rounded-2xl'>
        <p className={styles.sectionSubText}>Create an Account</p>
        <h3 className={styles.sectionHeadText}>Sign Up.</h3>
        <form onSubmit={handleSubmit} className='mt-2 flex flex-col gap-2'>
          <label className='flex flex-col '>
            <span className='text-white  font-medium mb-4'>
              Email
            </span>
            <input 
              type='email'
              name='email'
              ref={enteredEmail}
              placeholder='your name please...'
              className=' py-4 px-6 bg-transparent
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
          <p 
          className=' text-center'>
            <Link to='/signIn'
            className={`${styles.sectionSubText}`}>Already have an account?</Link></p>
          <button type='submit' component={ Link } to='/signIn'
           className='black-gradient py-3 px-8 outline-none shadow-md shadow-primary font-bold text-white rounded-xl'>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(SignUp, 'signUp');
