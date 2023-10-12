import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { BarA, ExpenseTracker, Leaderboard, ResetPassword, SignIn, SignUp, View } from './components';
import { ContextProvider } from './components/Context/Context';
import Profile from './components/View/Profile';
import { motion } from 'framer-motion';
import {  fadeIn, slideIn } from './utils/motion';
import Shoppingcart from './ShoppingCart/Shoppingcart';
import Home from './Home/Home';



function App() {

  
  

  return (
    <ContextProvider>
    <Router>
    <div >
        <Routes>
        
      
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signUp' element={<SignUp />} />
          <Route exact path='/signIn' element={<SignIn />} />
          <Route exact path='/signIn/Expense' element={<ExpenseTracker />} />
          <Route exact path='/view' element={<View />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/resetPassword' element={<ResetPassword />} />
          <Route exact path='/shopping' element={<Shoppingcart />} />
           <Route exact path='/leaderboard' element={<Leaderboard /> } />
          <Route exact path='/optimizedUser' element={<BarA /> } />
        </Routes>
        </div>
    </Router>
    </ContextProvider>
  );
}

export default App;
