import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Favourites() {
    const [favourites, setFavourites] = useState([]);
    const navigate = useNavigate();

    const removeFromFavourites = (id) => {
        const updated = favourites.filter((char) => char.id !== id);
        setFavourites(updated);
        localStorage.setItem("favourites", JSON.stringify(updated));
    };
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/");
        return;
        }

        const saved = JSON.parse(localStorage.getItem("favourites")) || [];
        setFavourites(saved);
    }, [navigate]);

    if (favourites.length === 0) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
            <p className="text-gray-500">No favourites saved yet.</p>
            <Link
                to="/characters"
                className="mt-4 inline-block text-blue-500 hover:underline"
            >
                ← Back to Characters
            </Link>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Link
                to="/characters"
                className="mb-4 inline-block text-blue-600 hover:underline"
                >
                ← Back to Characters
            </Link>
            <h1 className="text-3xl font-bold mb-6 text-center">My Favourites</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {favourites.map((char) => (
                <div
                    key={char.id}
                    className="bg-white rounded shadow p-4 text-center hover:shadow-md transition relative"
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
                        <h2 className="text-xl font-semibold">{char.name}</h2>
                    <p className="text-gray-500">{char.species}</p>
                    </Link>
                </div>
            
                ))}
            </div>
        </div>
    );
}

export default Favourites;
