import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context';
import { styles } from '../../styles';

const ExpenseTracker = () => {
  const { addExpense, expenses } = useContext(Context);
  const expenseRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const handleSubmit = (e) => {
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

    // Clear the form fields after adding the expense
    expenseRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = '';
  };

  return (
    <div>
      <h1 className='text-white text-start'>Welcome to ExpenseTracker!</h1>
      <h1 className='text-white text-end'>
        Your Profile is incomplete, <Link to='/view'>Complete now</Link>
      </h1>

      {expenses && (
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
      )}

      {!expenses && (
        <div>
          <h2 className={styles.heroHeadText}>Expenses:</h2>
          {expenses.map((expense, index) => (
            <ul key={index}>
              <li>{expense.description}</li>
              <li>${expense.expense}</li>
              <li>{expense.category}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
