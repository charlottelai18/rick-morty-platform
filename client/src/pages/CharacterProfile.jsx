// CharacterProfile.jsx: Displays detailed view for a character and allows saving to favourites
// Fetch character details on component mount and check if it's already saved
// Save character to localStorage based on logged-in user

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CharacterProfile() {
  const { id } = useParams(); // Get character ID from URL params
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null); // Holds fetched character details
  const [isSaved, setIsSaved] = useState(false); // Track if character is already favourited
  const [feedback, setFeedback] = useState(""); // Store feedback message

  useEffect(() => {
    // Redirect to login if user is unauthenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // Fetch character details using ID
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);

        // Check if character is already in global favourites (fallback logic)
        const saved = JSON.parse(localStorage.getItem("favourites")) || [];
        const alreadySaved = saved.find((c) => c.id === data.id);
        setIsSaved(!!alreadySaved);
      })
      .catch((err) => console.error("Failed to load character", err));
  }, [id, navigate]);

  // Auto-clear feedback messages after 3 seconds
  useEffect(() => {
    if (feedback) {
      const timeout = setTimeout(() => setFeedback(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [feedback]);

  // Save character to favourites under user's email-specific key
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

  // Loading state UI
  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 text-sm">Loading character...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      {/* Back navigation */}
      <button
        onClick={() => navigate("/characters")}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to Characters
      </button>

      {/* Character profile card */}
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto text-center">
        <img
          src={character.image}
          alt={character.name}
          className="w-40 h-40 mx-auto rounded-full mb-6 border-4 border-purple-200"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{character.name}</h1>
        <p className="text-gray-600 mb-1">Species: {character.species}</p>
        <p className="text-gray-600 mb-6">Gender: {character.gender}</p>

        {/* Episode list */}
        <p className="font-semibold mb-2 text-gray-700">Episodes:</p>
        <ul className="text-sm text-gray-500 mb-6">
          {character.episode.slice(0, 5).map((epUrl, index) => {
            const episodeNum = epUrl.split("/").pop();
            return <li key={index}>Episode {episodeNum}</li>;
          })}
        </ul>

        {/* Save to Favourites button */}
        <button
          onClick={saveToFavorites}
          disabled={isSaved}
          className={`w-full py-2 rounded text-white transition ${
            isSaved
              ? "bg-green-500 cursor-default"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          {isSaved ? "Saved to Favourites" : "Save to Favourites"}
        </button>

        {/* Feedback message */}
        {feedback && (
          <p className="mt-4 text-sm text-gray-700">{feedback}</p>
        )}
      </div>
    </div>
  );
}

export default CharacterProfile;
