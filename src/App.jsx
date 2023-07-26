import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { ExpenseTracker, ResetPassword, SignIn, SignUp, View } from './components';
import { ContextProvider } from './components/Context/Context';
import Profile from './components/View/Profile';
import { motion } from 'framer-motion';
import {  fadeIn, slideIn } from './utils/motion';
import Shoppingcart from './ShoppingCart/Shoppingcart';



function App() {

  return (
    <ContextProvider>
    <Router>
    <div className={`relative z-0  bg-cover bg-no-repeat bg-center1`}>
        <Routes>
        
      
     
          <Route exact path='/' element={<SignUp />} />
          
          <Route exact path='/signIn' element={<SignIn />} />
          <Route exact path='/signIn/Expense' element={<ExpenseTracker />} />
          <Route exact path='/view' element={<View />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/resetPassword' element={<ResetPassword />} />
          <Route exact path='/shopping' element={<Shoppingcart />} />
          
       
        
        </Routes>
        </div>
    </Router>
    </ContextProvider>
  );
}

export default App;
