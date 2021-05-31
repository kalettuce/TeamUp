import Router from "./utils/Router";
import "./App.css";
import { AuthProvider } from "./utils/AuthContext";
import NavigationBar from "./components/containers/NavigationBar";
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from "./ThemePalette";
import Footer from "./components/presentation/Footer";

function App(props) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <div className={"main"}>
        <NavigationBar />
        <Router />
        <Footer />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;