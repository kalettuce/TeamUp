import Router from "./utils/Router";
import './App.css';
import { AuthProvider } from "./utils/AuthContext";
import NavigationBar from "./components/containers/NavigationBar";
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from "./ThemePalette";

function App(props) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <NavigationBar />
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;