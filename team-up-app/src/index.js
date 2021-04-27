import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyCm49QK8-v7YtTf4oEgPSrLJsr5YVNbiTw",
  authDomain: "team-up-de57f.firebaseapp.com",
  databaseURL: "https://team-up-de57f-default-rtdb.firebaseio.com",
  projectId: "team-up-de57f",
  storageBucket: "team-up-de57f.appspot.com",
  messagingSenderId: "783661806569",
  appId: "1:783661806569:web:4d91e5e58d3835b497d178"
});

ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
