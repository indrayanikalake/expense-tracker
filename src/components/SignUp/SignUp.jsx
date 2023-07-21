import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { slideIn } from '../../utils/motion';
import firebase from 'firebase/app';
import 'firebase/auth';

const SignUp = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Use Firebase authentication to create a new user
      await firebase.auth().createUserWithEmailAndPassword(form.email, form.password);
      console.log('User has successfully signed up');
      // Additional logic or redirection after successful registration can be added here.
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className='flex-[0.75] bg-black-100 p-8 rounded-2xl'>
        <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Email Address</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='your email please...'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Password</span>
            <input
              type='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              placeholder='your password please...'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Confirm Password</span>
            <input
              type='password'
              name='confirmPassword'
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder='confirm password...'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>
          {error && <div className='text-red-500'>{error}</div>}
          <button type='submit' className='bg-tertiary py-3 px-8 outline-none shadow-md shadow-primary font-bold text-white rounded-xl'>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
