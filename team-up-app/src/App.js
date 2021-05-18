import Router from "./Router";
import './App.css';
import { AuthProvider } from "./utils/AuthContext";
import NavigationBar from "./components/containers/NavigationBar";

function App(props) {
  return (
    <AuthProvider>
      <NavigationBar />
      <Router />
    </AuthProvider>
  );
}

export default App;