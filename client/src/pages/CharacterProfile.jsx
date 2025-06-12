import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CharacterProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
        const saved = JSON.parse(localStorage.getItem("favourites")) || [];
        const alreadySaved = saved.find((c) => c.id === data.id);
        setIsSaved(!!alreadySaved);
      })
      .catch((err) => console.error("Failed to load character", err));
  }, [id, navigate]);

  // Auto-clear feedback after 3 seconds
  useEffect(() => {
    if (feedback) {
      const timeout = setTimeout(() => setFeedback(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [feedback]);

  const saveToFavorites = () => {
    const userEmail = localStorage.getItem("userEmail");
    const key = `favourites_${userEmail}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];

    const alreadySaved = existing.find((c) => c.id === character.id);
    if (!alreadySaved) {
      localStorage.setItem(key, JSON.stringify([...existing, character]));
      setIsSaved(true);
      setFeedback("Character saved to favourites!");
    } else {
      setFeedback("Character already in favourites.");
    }
  };

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 text-sm">Loading character...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/characters")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to list
      </button>

      <div className="bg-white p-6 rounded shadow max-w-xl mx-auto text-center">
        <img
          src={character.image}
          alt={character.name}
          className="w-40 h-40 mx-auto rounded-full mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{character.name}</h1>
        <p className="text-gray-600 mb-1">Species: {character.species}</p>
        <p className="text-gray-600 mb-4">Gender: {character.gender}</p>

        <p className="font-semibold mb-2">Episodes:</p>
        <ul className="text-sm text-gray-500 mb-4">
          {character.episode.slice(0, 5).map((epUrl, index) => {
            const episodeNum = epUrl.split("/").pop();
            return <li key={index}>Episode {episodeNum}</li>;
          })}
        </ul>

        <button
          onClick={saveToFavorites}
          disabled={isSaved}
          className={`px-4 py-2 rounded transition ${
            isSaved
              ? "bg-green-500 text-white cursor-default"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
        >
          {isSaved ? "Saved to Favourites" : "Save to Favourites"}
        </button>

        {/* Inline feedback message */}
        {feedback && (
          <p className="mt-3 text-sm text-gray-700">{feedback}</p>
        )}
      </div>
    </div>
  );
}

export default CharacterProfile;

