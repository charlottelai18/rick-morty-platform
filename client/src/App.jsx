import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Characters from "./pages/Characters"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/characters" element={<Characters />} /> 
    </Routes>
  );
}

export default App;

