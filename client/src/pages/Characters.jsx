import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results))
      .catch((err) => console.error("Error fetching characters:", err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative">
          <Link
            to="/user/characters"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
          >
            View Favourites
          </Link>

          <h1 className="text-3xl font-bold text-gray-800">Explore Characters</h1>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="focus:outline-none"
            >
              <UserCircleIcon className="h-10 w-10 text-blue-500 hover:text-blue-600" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
            <Link key={char.id} to={`/characters/${char.id}`}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center cursor-pointer min-h-[260px]">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">{char.name}</h2>
                <p className="text-gray-500">{char.species}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Characters;
