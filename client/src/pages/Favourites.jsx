import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");
  const key = `favourites_${userEmail}`;

  const removeFromFavourites = (id) => {
    const updated = favourites.filter((char) => char.id !== id);
    setFavourites(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const saved = JSON.parse(localStorage.getItem(key)) || [];
    setFavourites(saved);
  }, [navigate, key]);

  if (favourites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">No favourites saved yet.</h2>
          <Link
            to="/characters"
            className="inline-block bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 transition"
          >
            ← Back to Characters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/characters"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
          >
            ← Back to Characters
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">My Favourites</h1>
          <div className="w-36" /> {/* spacer for layout symmetry */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favourites.map((char) => (
            <div
              key={char.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center relative"
            >
              <button
                onClick={() => removeFromFavourites(char.id)}
                className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
              >
                ✖
              </button>
              <Link to={`/characters/${char.id}`}>
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">{char.name}</h2>
                <p className="text-gray-500">{char.species}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favourites;
