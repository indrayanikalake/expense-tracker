import React, { createContext, useState, useRef} from 'react';

const Context = createContext();

const ContextProvider = ({children}) =>{
    const initialToken = localStorage.getItem('token');
const [token, setToken] = useState(initialToken);
const [expenses, setExpenses] = useState([]);

const update = (newToken) =>{
    setToken(newToken);
    localStorage.setItem('token',newToken);
}
 const addExpense = (expense) =>{
  setExpenses((prevexpenses)=>[...prevexpenses,expense]);
 }

return (
    <Context.Provider
    value={{token, update, addExpense, expenses}}>
        {children}
    </Context.Provider>
)
}
export { Context, ContextProvider }