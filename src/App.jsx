import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { ExpenseTracker, SignIn, SignUp, View } from './components';

function App() {
  return (
    <Router>
      <div className='relative z-0 bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Routes>
          <Route exact path='/' element={<SignUp />} />
          <Route exact path='/signIn' element={<SignIn />} />
          <Route exact path='/signIn/Expense' element={<ExpenseTracker />} />
          <Route exact path='/view' element={<View />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
