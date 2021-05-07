import Router from "./Router";
import './App.css';
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

const database = firebase.database();
function App(props) {
  return (
    <div>
      <Router/>
    </div>
  );
}

export default App;
export { database };
