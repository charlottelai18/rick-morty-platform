import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Characters from "./pages/Characters";
import CharacterProfile from "./pages/CharacterProfile";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/:id" element={<CharacterProfile />} />
      <Route path="/user/characters" element={<Favourites />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;


