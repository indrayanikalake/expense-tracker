import React,{ useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context';

const ExpenseTracker = () => {

  return (
    <div >

     <h1 className='text-white text-start'>Welcome to ExpenseTracker!</h1> 
     <h1 className='text-white text-end'>Your Profile is incomplete,<Link
     to='/view'
     > Complete now</Link></h1>
    
     
    </div>
  )
}

export default ExpenseTracker;
