import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { ExpenseTracker, ResetPassword, SignIn, SignUp, View } from './components';
import { ContextProvider } from './components/Context/Context';
import Profile from './components/View/Profile';


function App() {
  return (
    <ContextProvider>
    <Router>
      <div className='relative z-0 bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center'>
      
        <Routes>
          <Route exact path='/' element={<SignUp />} />
          <Route exact path='/signIn' element={<SignIn />} />
          <Route exact path='/signIn/Expense' element={<ExpenseTracker />} />
          <Route exact path='/view' element={<View />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/resetPassword' element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
    </ContextProvider>
  );
}

export default App;
