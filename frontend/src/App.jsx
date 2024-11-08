import { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext"; 
import AppRoutes from "./routes/Approutes";
import Preloader from "./pages/Preloader";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const { loading } = useContext(AuthContext); 

  if (loading) {
    return <Preloader />; 
  }
  
  return (
    <div className="App">
      <Router>
        <AppRoutes /> 
      </Router>
    </div>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
