import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Characters() {
  const [characters, setCharacters] = useState([]);
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

      <Link
        to="/user/characters"
        className="absolute top-4 left-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Favourites
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-center">Characters</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {characters.map((char) => (
          <Link key={char.id} to={`/characters/${char.id}`}>
            <div className="bg-white rounded shadow p-4 text-center hover:shadow-md transition cursor-pointer">
              <img
                src={char.image}
                alt={char.name}
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold">{char.name}</h2>
              <p className="text-gray-500">{char.species}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Characters;