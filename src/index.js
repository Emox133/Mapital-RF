import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import GeometryContext from './context/GeometryContext'
import UserContext from './context/UserContext'
import {BrowserRouter as Router} from 'react-router-dom'

// axios.defaults.baseURL = 'http://localhost:8000/api/v1'
axios.defaults.baseURL = 'https://mapital-backend.herokuapp.com/api/v1'

const MyApp = () => {
  return (
    <GeometryContext>
      <UserContext>
        <Router>
          <App />
        </Router>
      </UserContext>
    </GeometryContext>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log(reg.scope, 'Service worker registered...'))
    .catch(err => console.log(err, 'Service worker registration failed...'))
  })
}

reportWebVitals();
