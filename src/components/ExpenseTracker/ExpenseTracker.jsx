import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import { Context } from '../Context/Context';
import { styles } from '../../styles';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setExpenses, addExpenses, deleteExpenses, editExpense } from '../../Redux/ExpenseSlice'
import { toggleTheme } from '../../Redux/ThemeSlice';
import { CSVLink } from 'react-csv';
import { toggleCartVisibility } from '../../Redux/CartSlice';
import { Card, Typography } from '@material-ui/core';


const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const isLightMode = useSelector((state) =>state.theme.lightMode);
  const isVisible = useSelector((state) =>state.cart.isVisible)
  const expenseRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
 
   const [dowload,setDownload] = useState(false);
 

  const data = Object.values(expenses).map((expense)=>expense);
  console.log(data);

  const headers =[
    {label: 'Description', key:'description' },
    {label: 'Expense', key:'expense' },
    {label: 'Category', key:'category' },
  ];

  useEffect(() =>{
    fetchData();
  },[]);

  const fetchData = async () =>{
    try{
    const getResponse = await axios.get('https://ecommerce-project-88866-default-rtdb.firebaseio.com/expense.json');
    dispatch(setExpenses(getResponse.data));
    console.log(Object.keys(getResponse.data).map((expense)=>expense));
    console.log(expenses);
    }catch(error){
      console.log(error);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const expense = expenseRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;

    const newExpense = {
      expense: parseFloat(expense),
      description,
      category,
    };

    dispatch(addExpenses(newExpense));
    try{
       const response = await axios.post('https://ecommerce-project-88866-default-rtdb.firebaseio.com/expense.json',
       newExpense
       )
       console.log(response);
        fetchData();
     
    }catch(error){
       console.log(error);
    }

    // Clear the form fields after adding the expense
    expenseRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = '';
    console.log(expenses);

  
  };

  const handleEdit = async (expenseId) => {
   

    const updatedExpense = {
      expense: parseFloat(expenseRef.current.value),
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    dispatch(editExpense({id : expenseId, updatedExpense}))
    try {
      await axios.put(`https://ecommerce-project-88866-default-rtdb.firebaseio.com/expense/${expenseId}.json`, updatedExpense);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (expenseId) => {
    dispatch(deleteExpenses(expenseId));
    try {
      await axios.delete(`https://ecommerce-project-88866-default-rtdb.firebaseio.com/expense/${expenseId}.json`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const expenseArray = Object.values(expenses);
  const totalExpense = expenseArray.reduce((total, expense) => total+ expense.expense, 0);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    setDownload(true);
    console.log(isLightMode);
  };

  return (
    <div className={`${isLightMode} 'bg-transparent':'black-gradient' `}>
      <div className='flex flex-col ' >
      <button className='text-white'
      style={{position:'fixed', top:'15px', left:'5px'}}
      onClick={()=>dispatch(toggleCartVisibility())}>
        Cart
      </button>
      {isVisible && (
        
          <Card className='w-[220px] lg:h-[600px] mx-2 my-12 p-12 text-start '
          style={{boxShadow:'10px 10px 10px rgb(250, 251, 249)'}}>
            <Typography 
            className='text-white text-start  '>Expense</Typography>
            <Link to='/signIn' 
            className='text-white violet-gradient'>Sign Out</Link>
          </Card>
        
      )}
      
      <h1 className={`font-bold text-white text-start fixed`}>Welcome to ExpenseTracker!</h1>
      <h1 className=' fixed text-white text-end'>
        Your Profile is incomplete, <Link to='/view'>Complete now</Link>
      </h1>
      </div>
      <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
      className=' mt-12  green-pink-gradient flex flex-row gap-12 p-5 rounded-2xl sm:w-[750px] rounded-[10px] w-[5px] h-[150px]'
      style={{
        background: 'linear-gradient(to bottom, violet, pink)'
      }}>
        
        <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
      className='  p-5 rounded-2xl sm:w-[100px] rounded-full w-[5px] h-[100px]'
      style={{
        background: 'linear-gradient(to left, green, magenta)',
        borderLeft:'10px solid black'
      }}> 
      <p className='text-white text-center font-bold'>Food</p>
      </Tilt>
        
        <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
      className='bg-tertiery  p-5 rounded-2xl sm:w-[100px] rounded-full w-[5px] h-[100px]'
      style={{
        background: 'linear-gradient(to left, gold, magenta)',
        borderLeft:'10px solid black'
      }}> 
      <p className='text-white'>Fashion</p>
      </Tilt>
       <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
      className='bg-tertiery  p-5 rounded-2xl sm:w-[100px] rounded-full w-[5px] h-[100px]'
      style={{
        background: 'linear-gradient(to left, black, magenta)',
        borderLeft:'10px solid black'
      }}> 
      <p className='text-white text-center '>Oil</p>
      </Tilt>
      
       <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
      className='bg-tertiery  p-5 rounded-2xl sm:w-[100px] rounded-full w-[5px] h-[100px]'
      style={{
        background: 'linear-gradient(to left, gray, green)',
        borderLeft:'10px solid black'
      }}> 
      <p className='text-white'>Travel</p>
      </Tilt>
       <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
      className='bg-tertiery  p-5 rounded-2xl sm:w-[100px] rounded-full w-[5px] h-[100px]'
      style={{
        background: 'linear-gradient(to left, green, gold)',
        borderLeft:'10px solid black'
      }}> 
      <p className='text-white'>Health</p>
      </Tilt>
      </Tilt>
      
      <form onSubmit={handleSubmit} 
       className={`${isLightMode? 'bg-transparent' : 'bg-white'} text-white flex flex-col  p-8 b-corner sm:absolute`}
       >
        <h2 className={`${styles.heroSubText} text-start text-white`}>Add Expense.</h2>
        <label className='flex flex-col text-start mt-2'>
          Expense:
          <input
          className='mt-2 bg-transparent'
          type='number' step='0.01' ref={expenseRef} required />
        </label>
        <label className='flex flex-col text-start mt-2' >
          Description:
          <input type='text' ref={descriptionRef} 
            className='mt-2 p-8 bg-transparent' required />
        </label>
        <label className='flex flex-col text-start mt-2'>
          Category:
          <select 
            className='mt-2 bg-transparent bg-black' ref={categoryRef} required>
            <option value='Food'>Food</option>
            <option value='Petrol'>Petrol</option>
            <option value='Salary'>Salary</option>
          </select>
        </label>
        <button type='submit'
        className='flex flex-col  mt-2 black-gradient rounded-[10px] w-[100px] text-center'>Add Expense</button>
      </form>

      <div className='bg-corner bottom-0 left-100'>
        <h2 className={`${styles.heroSubText} text-center mt-20`}>Expenses:</h2>
        {Object.keys(expenses).map((expenseId) => {
          const expense = expenses[expenseId];
          return (
            <ul key={expenseId} className='flex flex-row p-2 text-white space-x-4 items-center justify-center'>
              <li>{expense.description}</li>
              <li>${expense.expense}</li>
              <li>{expense.category}</li>
              <button
              className='green-text-gradient '
                type='button'
                onClick={() => {
                
                  handleEdit(expenseId);
                }}
              >
                Edit
              </button>
              <button className='rounded orange-text-gradient'
              type='button' onClick={() => handleDelete(expenseId)}>
                Delete
              </button>
            </ul>
          );
        })}
        </div>
      <div>
      {totalExpense > 10000 && (
        <button className="premium-button" onClick={handleThemeToggle}>Activate Premium</button>
      )}
      
    
    
    {dowload && (
    <div>
      <CSVLink data={data} headers={headers} filename='expenseData.csv'>

      <button >
      Download
      </button>
      </CSVLink>
      </div>
      )}
    </div>
    </div>
  );
};

export default ExpenseTracker;
