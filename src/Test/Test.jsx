import React from "react";
import { render ,screen, fireEvent} from '@testing-library/react';
import { ExpenseTracker } from "../components";
import { expense } from "../assets";

describe('Expense Tracker Component', ()=>{
    //Test1: check if component rendered correctly
    test('renders without errors',()=>{
        render(<ExpenseTracker />);
        const welcomeText = screen.getByText('Welcome to ExpenseTracker!');
        expect(welcomeText).toBeInTheDocument();
    });

    //Test2: check if adding an expense work correctly
    test('Adding an expense update the list', ()=>{
        render(<ExpenseTracker />);

        const expenseInput = screen.getByLabelText('Expense:');
        const descriptionInput = screen.getByLabelText('Description');
        const categorySelect = screen .getByLabelText('Category:');
        const dateInput =  screen.getByLabelText('Date:');
        const addExpenseButton = screen.getByText('Add Expense:');

        fireEvent.change(expenseInput, { target: { value :'50'}});
        fireEvent.change(descriptionInput, { target: { value: 'Test Expense'}});
        fireEvent.change(categorySelect, { target: {value: 'Food'}});
        fireEvent.change(dateInput, {type: { value: '2023-07-09'}});
        fireEvent.click(addExpenseButton);

        const addExpense = screen.getByText('Expenses:')
        expect(addExpense).toBeInTheDocument();
    });

    //test3 check if deleting part is working or not
    test('Deleting an expense removing from list', ()=>{
        render(<ExpenseTracker />);

        const existingExpense = screen.getByText('Expenses:');
        const dleteButton = screen.getByText('Delete');

        fireEvent.click(dleteButton);
        expect(existingExpense).no.toBeInTheDocument();
    });

    //test4: check totalExpenses
    test('total expense is correctly calculated', ()=>{
        render(<ExpenseTracker />);

        const totalExpenseAmount = screen.getByText('Expenses:$', {exact: false});
        expect(totalExpenseAmount).toHaveTextContent('Expenses:56430$')
    })
    //test5: check if the income input is correctly updating the state
    test('income input correctly updates the state', ()=>{
         
        render(<ExpenseTracker  />);

        const incomeInput = screen.getByLabelText('Income:');
        fireEvent.change(incomeInput, {target: { value:'5000000'}});
        expect(incomeInput).toHaveValue('5000000');
    })
    // Sample test case 5: Test if the total is not negative when deleting an unknown expense
test('Check if total remains unchanged when trying to delete an unknown expense', () => {
    deleteExpense('Unknown Expense');
    const expenses = getExpenseTotal();
    expect(expenses).toBeGreaterThanOrEqual(0);
  });
  
  // Sample test case 6: Test if adding a negative expense is handled correctly
  test('Check if adding a negative expense throws an error', () => {
    expect(() => addExpense('Negative Expense', -20)).toThrow();
  });
  
  // Sample test case 7: Test if the total remains unchanged when adding a negative expense
  test('Check if total remains unchanged when adding a negative expense', () => {
    try {
      addExpense('Negative Expense', -15);
    } catch (error) {}
    const expenses = getExpenseTotal();
    expect(expenses).toEqual(0);
  });
  
  // Sample test case 8: Test if an expense is deleted correctly, even if it was not previously added
  test('Delete an expense that was not added and check if the total is unchanged', () => {
    deleteExpense('Non-existent Expense');
    const expenses = getExpenseTotal();
    expect(expenses).toEqual(0);
  });
  
  // Sample test case 9: Test if the expense total is correct after adding and deleting expenses
  test('Add and delete expenses and check if the total is correct', () => {
    addExpense('Lunch', 15);
    addExpense('Gas', 40);
    deleteExpense('Lunch');
    addExpense('Movie', 20);
    const expenses = getExpenseTotal();
    expect(expenses).toEqual(60);
  });
  
  // Sample test case 10: Test if the expense total is not affected by adding a non-numeric amount
  test('Check if adding a non-numeric amount does not affect the total', () => {
    addExpense('Invalid Expense', 'Invalid Amount');
    const expenses = getExpenseTotal();
    expect(expenses).toEqual(0);  
  });
   
})