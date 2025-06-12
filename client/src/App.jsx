import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Characters from "./pages/Characters"; 
import CharacterProfile from "./pages/CharacterProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/characters" element={<Characters />} /> 
      <Route path="/characters/:id" element={<CharacterProfile />} />
    </Routes>
  );
}

export default App;

