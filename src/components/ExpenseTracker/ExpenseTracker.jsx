import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context';
import { styles } from '../../styles';
import axios from 'axios';

const ExpenseTracker = () => {
  const { addExpense, expenses } = useContext(Context);
  const expenseRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [responseData, setRespnseData] = useState({});
  

  useEffect(() =>{
    fetchData();
  },[]);

  const fetchData = async () =>{
    try{
    const getResponse = await axios.get('https://ecommerce-project-88866-default-rtdb.firebaseio.com/expense.json');
    setRespnseData(getResponse.data);
    console.log(Object.keys(getResponse.data).map((expense)=>expense));
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

    addExpense(newExpense);
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
    try {
      await axios.put(`https://ecommerce-project-88866-default-rtdb.firebaseio.com/expense/${expenseId}.json`, updatedExpense);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      await axios.delete(`https://ecommerce-project-88866-default-rtdb.firebaseio.com/expense/${expenseId}.json`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className='text-white text-start'>Welcome to ExpenseTracker!</h1>
      <h1 className='text-white text-end'>
        Your Profile is incomplete, <Link to='/view'>Complete now</Link>
      </h1>

      <form onSubmit={handleSubmit}>
        <h2 className={styles.heroHeadText}>Add Expense.</h2>
        <label>
          Expense:
          <input type='number' step='0.01' ref={expenseRef} required />
        </label>
        <label>
          Description:
          <input type='text' ref={descriptionRef} required />
        </label>
        <label>
          Category:
          <select ref={categoryRef} required>
            <option value='Food'>Food</option>
            <option value='Petrol'>Petrol</option>
            <option value='Salary'>Salary</option>
          </select>
        </label>
        <button type='submit'>Add Expense</button>
      </form>

      <div>
        <h2 className={`${styles.heroSubText} text-start mt-12`}>Expenses:</h2>
        {Object.keys(responseData).map((expenseId) => {
          const expense = responseData[expenseId];
          return (
            <ul key={expenseId} className='flex flex-row p-2 text-white space-x-4 items-center justify-center'>
              <li>{expense.description}</li>
              <li>${expense.expense}</li>
              <li>{expense.category}</li>
              <button
                type='button'
                onClick={() => {
                
                  handleEdit(expenseId);
                }}
              >
                Edit
              </button>
              <button type='button' onClick={() => handleDelete(expenseId)}>
                Delete
              </button>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseTracker;
