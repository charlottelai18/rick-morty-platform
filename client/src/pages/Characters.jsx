import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Protect the page
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // Fetch characters
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
      <h1 className="text-3xl font-bold mb-6 text-center">Characters</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {characters.map((char) => (
          <div
            key={char.id}
            className="bg-white rounded shadow p-4 text-center hover:shadow-md transition"
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">{char.name}</h2>
            <p className="text-gray-500">{char.species}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Characters;
