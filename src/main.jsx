import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Redux/Redux.jsx'
import store1 from './Redux/store1.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} store1={store1} >
    <App />
  </Provider>
)
