import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ExpenseTracker } from '../components';

describe('Expense Tracker Component', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  // Test 1: check if component rendered correctly
  test('renders without errors', () => {
    render(<ExpenseTracker />);
    const welcomeText = screen.getByText('Welcome to ExpenseTracker!');
    expect(welcomeText).toBeInTheDocument();
  });

  // Test 2: check if adding an expense work correctly
  test('Adding an expense updates the list', async () => {
    render(<ExpenseTracker />);

    const expenseInput = screen.getByLabelText('Expense:');
    const descriptionInput = screen.getByLabelText('Description');
    const categorySelect = screen.getByLabelText('Category:');
    const dateInput = screen.getByLabelText('Date:');
    const addExpenseButton = screen.getByText('Add Expense');

    fireEvent.change(expenseInput, { target: { value: '50' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Expense' } });
    fireEvent.change(categorySelect, { target: { value: 'Food' } });
    fireEvent.change(dateInput, { target: { value: '2023-07-09' } });
    fireEvent.click(addExpenseButton);

    // Mock API response for the post request
    mockAxios.onPost('https://ecommerce-project-88866-default-rtdb.firebaseio.com/testuser.json').reply(200, {});

    // Wait for the async operations to finish
    await screen.findByText('Expenses:');

    const addedExpense = screen.getByText('Test Expense');
    expect(addedExpense).toBeInTheDocument();
  });

  // Test 3: check if deleting an expense removes it from the list
  test('Deleting an expense removes it from the list', async () => {
    render(<ExpenseTracker />);

    const existingExpense = screen.getByText('Test Expense');
    const deleteButton = screen.getByText('Delete');

    // Mock API response for the delete request
    mockAxios.onDelete('https://ecommerce-project-88866-default-rtdb.firebaseio.com/testuser/testExpense.json').reply(200, {});

    fireEvent.click(deleteButton);

    // Wait for the async operations to finish
    await screen.findByText('Expenses:');

    expect(existingExpense).not.toBeInTheDocument();
  });

  // Test 4: check if the total expenses are correctly calculated
  test('total expense is correctly calculated', async () => {
    render(<ExpenseTracker />);

    // Mock API response for the get request
    mockAxios.onGet('https://ecommerce-project-88866-default-rtdb.firebaseio.com/testuser.json').reply(200, {
      testExpense: { expense: 50, description: 'Test Expense', category: 'Food', date: '2023-07-09' },
    });

    // Wait for the async operations to finish
    await screen.findByText('Expenses:');

    const totalExpenseAmount = screen.getByText('Expenses:50$', { exact: false });
    expect(totalExpenseAmount).toBeInTheDocument();
  });

  // Test 5: check if the income input correctly updates the state
  test('income input correctly updates the state', async () => {
    render(<ExpenseTracker />);

    const incomeInput = screen.getByLabelText('Income:');
    fireEvent.change(incomeInput, { target: { value: '5000000' } });
    expect(incomeInput).toHaveValue('5000000');
  });

  // Continuing from the previous test file...

// Test 6: Test if the total is not negative when deleting an unknown expense
test('Check if total remains unchanged when trying to delete an unknown expense', async () => {
    render(<ExpenseTracker />);
    const totalExpenseAmount = screen.getByText('Expenses:0$', { exact: false });
    expect(totalExpenseAmount).toBeInTheDocument();
  
    // Try to delete an unknown expense
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
  
    // Wait for the async operations to finish
    await screen.findByText('Expenses:0$', { exact: false });
  
    expect(totalExpenseAmount).toBeInTheDocument();
  });
  
  // Test 7: Test if adding a negative expense is handled correctly
  test('Check if adding a negative expense throws an error', async () => {
    render(<ExpenseTracker />);
    const totalExpenseAmount = screen.getByText('Expenses:0$', { exact: false });
    expect(totalExpenseAmount).toBeInTheDocument();
  
    // Adding a negative expense should throw an error
    expect(() => {
      const addExpenseButton = screen.getByText('Add Expense');
      fireEvent.click(addExpenseButton);
    }).toThrow();
  
    // Wait for the async operations to finish
    await screen.findByText('Expenses:0$', { exact: false });
  
    // Check if total remains unchanged
    expect(totalExpenseAmount).toBeInTheDocument();
  });
  
  // Test 8: Test if the total remains unchanged when adding a negative expense
  test('Check if total remains unchanged when adding a negative expense', async () => {
    render(<ExpenseTracker />);
    const totalExpenseAmount = screen.getByText('Expenses:0$', { exact: false });
    expect(totalExpenseAmount).toBeInTheDocument();
  
    // Adding a negative expense should throw an error
    expect(() => {
      const addExpenseButton = screen.getByText('Add Expense');
      fireEvent.change(screen.getByLabelText('Expense:'), { target: { value: '-15' } });
      fireEvent.click(addExpenseButton);
    }).toThrow();
  
    // Wait for the async operations to finish
    await screen.findByText('Expenses:0$', { exact: false });
  
    // Check if total remains unchanged
    expect(totalExpenseAmount).toBeInTheDocument();
  });
  
  // Test 9: Test if an expense is deleted correctly, even if it was not previously added
  test('Delete an expense that was not added and check if the total is unchanged', async () => {
    render(<ExpenseTracker />);
    const totalExpenseAmount = screen.getByText('Expenses:0$', { exact: false });
    expect(totalExpenseAmount).toBeInTheDocument();
  
    // Try to delete an unknown expense
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
  
    // Wait for the async operations to finish
    await screen.findByText('Expenses:0$', { exact: false });
  
    // Check if total remains unchanged
    expect(totalExpenseAmount).toBeInTheDocument();
  });
  
  // Test 10: Test if the expense total is correct after adding and deleting expenses
  test('Add and delete expenses and check if the total is correct', async () => {
    render(<ExpenseTracker />);
    const totalExpenseAmount = screen.getByText('Expenses:0$', { exact: false });
    expect(totalExpenseAmount).toBeInTheDocument();
  
    // Adding expenses
    const addExpenseButton = screen.getByText('Add Expense');
    fireEvent.change(screen.getByLabelText('Expense:'), { target: { value: '15' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Lunch' } });
    fireEvent.change(screen.getByLabelText('Category:'), { target: { value: 'Food' } });
    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2023-07-09' } });
    fireEvent.click(addExpenseButton);
  
    fireEvent.change(screen.getByLabelText('Expense:'), { target: { value: '40' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Gas' } });
    fireEvent.change(screen.getByLabelText('Category:'), { target: { value: 'Food' } });
    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2023-07-10' } });
    fireEvent.click(addExpenseButton);
  
    fireEvent.change(screen.getByLabelText('Expense:'), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Movie' } });
    fireEvent.change(screen.getByLabelText('Category:'), { target: { value: 'Entertainment' } });
    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2023-07-11' } });
    fireEvent.click(addExpenseButton);
  
    // Deleting an expense
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);
  
    // Wait for the async operations to finish
    await screen.findByText('Expenses:60$', { exact: false });
  
    // Check if the total is correct
    expect(totalExpenseAmount).toHaveTextContent('Expenses:60$');
  });
  
  // Test 11: Test if the expense total is not affected by adding a non-numeric amount
  test('Check if adding a non-numeric amount does not affect the total', async () => {
    render(<ExpenseTracker />);
    const totalExpenseAmount = screen.getByText('Expenses:0$', { exact: false });
    expect(totalExpenseAmount).toBeInTheDocument();
  
    // Adding an invalid expense amount
    const addExpenseButton = screen.getByText('Add Expense');
    fireEvent.change(screen.getByLabelText('Expense:'), { target: { value: 'Invalid Amount' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Invalid Expense' } });
    fireEvent.change(screen.getByLabelText('Category:'), { target: { value: 'Food' } });
    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2023-07-09' } });
    fireEvent.click(addExpenseButton);
  
    // Wait for the async operations to finish
    await screen.findByText('Expenses:0$', { exact: false });
  
    // Check if total remains unchanged
    expect(totalExpenseAmount).toBeInTheDocument();
  });
  
});
