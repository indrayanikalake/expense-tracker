// Login.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './AuthSlice';

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome to the Dashboard!</h1>
          <button onClick={handleLogout}>Logout</button>
          {/* Render the dashboard content here */}
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
