import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { ExpenseTracker, ResetPassword, SignIn, SignUp, View } from './components';
import { ContextProvider } from './components/Context/Context';
import Profile from './components/View/Profile';
import { motion } from 'framer-motion';
import {  fadeIn, slideIn } from './utils/motion';
import Counter from './Redux/Counter';
import LogIn from './Redux/LogIn';

function App() {

  return (
    <ContextProvider>
    <Router>
    <motion.div className='relative z-0 bg-transparent bg-cover bg-no-repeat bg-center'
      
      variants={slideIn("up", "tween", 0.2, 1)}>
        <Routes>
        
          <Route exact path='/' element={<SignUp />} />
          <Route exact path='/signIn' element={<SignIn />} />
          <Route exact path='/signIn/Expense' element={<ExpenseTracker />} />
          <Route exact path='/view' element={<View />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/resetPassword' element={<ResetPassword />} />
          <Route exact path='/counter' element={<Counter />} /> 
          <Route exact path='/counter1' element={<LogIn />} />
        </Routes>
        
        </motion.div>
    </Router>
    </ContextProvider>
  );
}

export default App;
