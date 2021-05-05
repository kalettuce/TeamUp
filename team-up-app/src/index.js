import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';

import LandingPage from './components/pages/LandingPage';

firebase.initializeApp({
  apiKey: "AIzaSyCm49QK8-v7YtTf4oEgPSrLJsr5YVNbiTw",
  authDomain: "team-up-de57f.firebaseapp.com",
  databaseURL: "https://team-up-de57f-default-rtdb.firebaseio.com",
  projectId: "team-up-de57f",
  storageBucket: "team-up-de57f.appspot.com",
  messagingSenderId: "783661806569",
  appId: "1:783661806569:web:4d91e5e58d3835b497d178"
});

let database = firebase.database();

ReactDOM.render(
  /*
  <BrowserRouter>
      <App database={database}/>
  </BrowserRouter>*/ 
  <LandingPage />,
  document.getElementById('root')
);

reportWebVitals();
