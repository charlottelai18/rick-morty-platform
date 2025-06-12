// App.jsx: Defines the main routing structure for the application using React Router.

import { Routes, Route } from "react-router-dom";

// Page components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Characters from "./pages/Characters";
import CharacterProfile from "./pages/CharacterProfile";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      {/* Route for user login */}
      <Route path="/" element={<Login />} />

      {/* Route for new user registration */}
      <Route path="/registration" element={<Register />} />

      {/* Route to view list of all characters */}
      <Route path="/characters" element={<Characters />} />

      {/* Route to view an individual character’s profile (by ID) */}
      <Route path="/characters/:id" element={<CharacterProfile />} />

      {/* Route to view saved favourite characters */}
      <Route path="/user/characters" element={<Favourites />} />

      {/* Route to view the current user's profile */}
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
