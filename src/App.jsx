import  React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css'
import { SignUp } from './components';

function App() {
  

  return (
    
    <BrowserRouter>
    <div className='relative z-0 bg-white bg-hero-pattern bg-cover bg-no-repeat bg-center'>
    <SignUp />
    </div>
    </BrowserRouter>
      
   
  )
}

export default App
