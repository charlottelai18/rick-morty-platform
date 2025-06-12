import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Characters from "./pages/Characters";
import CharacterProfile from "./pages/CharacterProfile";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/:id" element={<CharacterProfile />} />
      <Route path="/user/characters" element={<Favourites />} />
    </Routes>
  );
}

export default App;


