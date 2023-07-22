import React, { createContext, useState} from 'react';

const Context = createContext();

const ContextProvider = ({children}) =>{
    const initialToken = localStorage.getItem('token');
const [token, setToken] = useState(initialToken);

const update = (newToken) =>{
    setToken(token);
    localStorage.setItem('token',newToken);
}

return (
    <Context.Provider
    value={{token, update}}>
        {children}
    </Context.Provider>
)
}
export { Context, ContextProvider }