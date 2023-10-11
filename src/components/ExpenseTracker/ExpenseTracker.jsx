import React, { useContext, useEffect, useRef, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
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
import Graph from './Graph';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../../hoc';
import { fadeIn, slideIn } from '../../utils/motion';
import { v4 as uuidv4 } from 'uuid';
import { paymentHandler } from '../../Redux/PaymentSlice';

const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const isLightMode = useSelector((state) =>state.theme.lightMode);
  const isVisible = useSelector((state) =>state.cart.isVisible)
  const expenseRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dateRef = useRef();
  const incomeRef = useRef(null);
  const [income, setIncome] = useState(0);
  const email = localStorage.getItem('email')?.replace('@','').replace('.','');
  const alanKey='bb966699a022619e2e4f6d2eb1c2a4732e956eca572e1d8b807a3e2338fdd0dc/stage';
  const token = localStorage.getItem('token');
 
   const [dowload,setDownload] = useState(false);
   const incomeValue = incomeRef.current? incomeRef.current.value :0;
  console.log(incomeValue);
console.log(token);
 console.log(expenses);

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

  useEffect(() => {
    alanBtn({
        key: alanKey,
        onCommand: (commandData) => {
         console.log(commandData);
        }
    });
  }, []);

  const fetchData = async () =>{
    try{
    const getResponse = await axios.get('http://localhost:7000/expense');
    console.log(getResponse);
    if(getResponse.data === null){
      getResponse.data = {};
    }
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
    const date = dateRef.current.value;

    const newExpense = {
      expense: parseFloat(expense),
      description,
      category,
      date,
    };

    dispatch(addExpenses(newExpense));
    const localId = uuidv4();
    const newExpenseWithId = {
      ...newExpense,
        localId: localId
    }
    try{
      const config = {
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }

       const response = await axios.post('http://localhost:7000/expense',
       newExpenseWithId, config
       )
       console.log(response);
       await fetchData();
     
    }catch(error){
       console.log(error);
    }

    // Clear the form fields after adding the expense
    expenseRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = '';
    dateRef.current.value='';
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
      await axios.put(`https://ecommerce-project-88866-default-rtdb.firebaseio.com/${email}/${expenseId}.json`, updatedExpense);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (expenseId) => {
    dispatch(deleteExpenses(expenseId));
    try {
      await axios.delete(`https://ecommerce-project-88866-default-rtdb.firebaseio.com/${email}/${expenseId}.json`);
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

  const categories = Object.values(expenses).map((expense)=>expense.category);
    console.log(categories);

    const categoryCount = categories.reduce((counts, category) =>{
    counts[category]= (counts[category] || 0)+1;
    return counts},{});
    console.log(categoryCount);

  const totalExpenses = Object.values(expenses).reduce((total, expense)=>
  total+ expense.expense , 0);
  console.log(totalExpense);

  const balance = income-totalExpense;


  //total expenses for each category
  const categoryTotals = {};
      Object.values(expenses).forEach((expense) => {
       const { category, expense: expenseAmount } = expense;
        if (categoryTotals[category]) {
          categoryTotals[category] += expenseAmount;
        } else {
         categoryTotals[category] = expenseAmount;
        }
      });
        console.log(categoryTotals);

  const percentageData = Object.keys(categoryTotals).map((category) => {
          const percentage = ((categoryTotals[category]/totalExpenses)*100).toFixed(1);
          return { category, percentage };
  });
        console.log(percentageData);

  const getCategoryPercentage = (category) => {
    const categoryData = percentageData.find((item) => item.category === category);
    return categoryData ? parseFloat(categoryData.percentage) : 0;
  };

  const removeLocal = () =>{
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }

  const handlePayment = () =>{
    try{
      dispatch(paymentHandler())

    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className={`${isLightMode? 'black-gradient' : 'bg-white'}`}>
      <div className='flex flex-col ' >
      <button className='text-white'
      style={{position:'absolute', top:'8px', left:'5px'}}
      onClick={()=>dispatch(toggleCartVisibility())}>
        Cart
      </button>
      
      {isVisible && (
        <div>
          <Card className='w-[200px] lg:h-[60px] mx-2 my-12 p-12 text-start '
          style={{boxShadow:'1px 1px 1px rgb(250, 251, 249)',position:'absolute', zIndex:'1'}}>
             <button type='button' onClick={()=>{removeLocal()}}>
            <Link to='/signIn' 
            className='text-white violet-gradient'>Sign Out</Link></button>
             <button  className='text-white violet-gradient' type='button' onClick={handlePayment}>
           Buy Premium</button>
          </Card>
         
          </div>
           
      )}
      
      <h1 className={`font-bold text-white text-start `}>Welcome to ExpenseTracker!</h1>
      <span className='  text-white text-end'>
        Your Profile is incomplete, <Link to='/view'>Complete now</Link>
      </span>
      <div className='flex flex-row'>
      {totalExpense > 10000 && (
        <button className="text-white w-[200px]"
        style={{ background: 'linear-gradient(to up,rgb(39, 2, 2),  rgb(244, 223, 223))',
      position:'absolute', top:'55px', left:'450px'}}
         onClick={handleThemeToggle}>Activate Premium</button>
      )}
       {dowload && (
    <div>
      <CSVLink data={data} headers={headers} filename='expenseData.csv'>

      <button className='text-white'
      style={{ position:'absolute', top:'55px', left:'750px'}}>
      Download
      </button>
      </CSVLink>
      </div>
      )}
      </div>
      </div>
      <motion.div
      variants={fadeIn("down","tween",0.2,1)}>
      <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
      className=' mt-8   flex flex-row gap-12 p-5  sm:w-[750px] rounded-[10px] h-[150px]'
      style={{
        background: 'linear-gradient(to bottom, violet, pink)',
        overflow:'hidden'
      }}>
        
        <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
      className='  p-5  sm:w-[100px] rounded-full w-[5px] h-[100px]'
      style={{
        background: 'linear-gradient(to left, green, magenta)',
        borderLeft:'10px solid black'
      }}> 
      <p className='text-white text-center font-bold  bg-transparent'>Food</p>
      <p className='text-white bg-transparent'>{getCategoryPercentage('Food').toFixed(1)}%</p>
      </Tilt>
        
        <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
      className='bg-tertiery  p-5  sm:w-[100px] rounded-full w-[5px] h-[100px]'
      style={{
        background: 'linear-gradient(to left, gold, magenta)',
        borderLeft:'10px solid black'
      }}> 
      <p className='text-white bg-transparent'>Fashion</p>
      <p className='text-white bg-transparent'>{getCategoryPercentage('Fashion').toFixed(1)}%</p>
      </Tilt>
       <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
      className='bg-tertiery  p-5  sm:w-[100px] rounded-full w-[5px] h-[100px]'
      style={{
        background: 'linear-gradient(to left, black, magenta)',
        borderLeft:'10px solid black'
      }}> 
      <p className='ttext-white bg-transparent text-center'>Salary</p>
      <p className='text-white bg-transparent'>{getCategoryPercentage('Salary').toFixed(1)}%</p>
      </Tilt>
      
       <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
      className='bg-tertiery  p-5  sm:w-[100px] rounded-full w-[5px] h-[100px]'
      style={{
        background: 'linear-gradient(to left, gray, green)',
        borderLeft:'10px solid black'
      }}> 
      <p className='text-white bg-transparent'>Travel</p>
      <p className='text-white bg-transparent'>{getCategoryPercentage('Travel').toFixed(1)}%</p>
      </Tilt>
       <Tilt
       options={{
        max:45,
        scale:1,
        speed:450
      }}
      className='bg-tertiery  p-5  sm:w-[100px] rounded-full w-[5px] h-[100px]'
      style={{
        background: 'linear-gradient(to left, green, gold)',
        borderLeft:'10px solid black'
      }}> 
      <p className='text-white bg-transparent'>Health</p>
      <p className='text-white bg-transparent'>{getCategoryPercentage('Health').toFixed(1)}%</p>
      </Tilt>
      </Tilt>
      </motion.div>
      <motion.div 
      variants={fadeIn("up","tween",0.2,1)}
      style={{margin :'2.1rem 0', height:'2vh'}} >
       <Graph />
      </motion.div>
     
      <form onSubmit={handleSubmit} 
       className=' text-white flex flex-col w-[420px] h-[540px] p-10 b-corner bg-transparent sm:absolute'
       >
        <h2 className={`${styles.heroSubText} text-start text-white font-bold`}>Add Expense.</h2>
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
        <label className="flex flex-col text-start mt-2">
        Date:
        <input type="date" ref={dateRef} className='bg-transparent' required />
      </label>
        <label className='flex flex-col text-start mt-2'>
          Category:
          <select 
            className='mt-2 bg-transparent bg-black' ref={categoryRef} required>
            <option value='Food'>Food</option>
            <option value='Fashion'>Fashion</option>
            <option value='Salary'>Salary</option>
            <option value='Travel'>Travel</option>
            <option value='Health'>Health</option>
          </select>
        </label>
        <button type='submit'
        className='flex flex-col  mt-2 black-gradient rounded-[10px] w-[100px] text-center'>Add Expense</button>
       <label className='mt-5'>
        Income:
        <input 
        className='mt-2 bg-transparent ref={incomeRef}'
        ref={incomeRef}
         type="number"
         value={income}
         onChange={(e) => setIncome(Number(e.target.value))}
         />
       </label>
      </form>
      
      <div style={{margin:'19rem 0'}}>
        <div className='flex flex-row mt-0 text-white font-bold'>
        <button className='violet-gradient w-[200px] h-[80px] rounded-[10px] ml-0'
        style={{marginLeft:'0rem'}}>Income:{income}<span className='green-text-gradient font-bold'>$</span></button>
         <button className='violet-gradient w-[200px] h-[80px] rounded-[10px] ml-0'
        style={{marginLeft:'5rem'}}>Expenses:{totalExpense}<span className='green-text-gradient font-bold'>$</span></button>
         <button className='violet-gradient w-[200px] h-[80px] rounded-[10px] ml-0'
        style={{marginLeft:'5rem'}}>Balance:{balance}<span className='green-text-gradient font-bold'>$</span></button>
         <button className='violet-gradient w-[200px] h-[80px] rounded-[10px] ml-0'
         onClick={handlePayment}
        style={{marginLeft:'5rem'}}>Buy Premium</button>
        </div>
     
        <h2 className={`${styles.heroSubText} text-center mt-20 black-gradient`}>Expenses:</h2>
        {Object.keys(expenses).map((expenseId) => {
          const expense = expenses[expenseId];
          return (
            <ul key={expenseId} 
            style={{border:'2px solid green'}}
            className='flex flex-row p-2 text-white space-x-24 bg-transparent  items-center justify-center'>
               <li>{expense.date}</li>
              <li>{expense.description}</li>
              <li>${expense.expense}</li>
              <li>{expense.category}</li>
             
              <button
              className='green-text-gradient font-bold '
                type='button'
                onClick={() => {
                
                  handleEdit(expenseId);
                }}
              >
                Edit
              </button>
              <button className='rounded orange-text-gradient font-bold'
              type='button' onClick={() => handleDelete(expenseId)}>
                Delete
              </button>
            </ul>
          );
        })}
        </div>
      <div>
     
    </div>
    </div>
  );
};

export default SectionWrapper(ExpenseTracker,'sectionWrapper');
