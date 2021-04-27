import Router from "./Router";
import './App.css';

function App(props) {
  return (
    <div>
      <Router database={props.database}/>
    </div>
  );
}

export default App;
