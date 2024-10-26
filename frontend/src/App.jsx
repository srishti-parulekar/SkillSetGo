import { useContext } from "react";
import { AuthContext } from "./context/AuthContext"; 
import AppRoutes from "./routes/AppRoutes"; 
import Preloader from "./pages/Preloader";

function App() {
  const { loading } = useContext(AuthContext); 

  if (loading) {
    return <Preloader />; 
  }
  
  return (
    <div className="App">
      <AppRoutes /> 
    </div>
  );
}

export default App;
