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

        const totalExpenseAmount = screen.getByText('Expenses:$');
        expect(totalExpenseAmount).toHaveTextContent('Expenses:56430$')
    })
    //test5: check if the income input is correctly updating the state
    test('income input correctly updates the state', ()=>{
         
        render(<ExpenseTracker  />);

        const incomeInput = screen.getByLabelText('Income:');
        fireEvent.change(incomeInput, {target: { value:'5000000'}});
        expect(incomeInput).toHaveValue('5000000');
    })
    
   
})