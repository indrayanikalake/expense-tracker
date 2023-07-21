import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { SignIn, SignUp } from './components';

function App() {
  return (
    <Router>
      <div className='relative z-0 bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/signIn' element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;