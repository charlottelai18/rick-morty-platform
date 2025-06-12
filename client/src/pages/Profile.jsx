// Profile.jsx: Displays current user's name and email from localStorage

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Profile() {
    const navigate = useNavigate();

    // Check if user is authenticated (has a valid token); if not, redirect to login
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    // Retrieve user data from localStorage
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                
                {/* Profile title */}
                <h2 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h2>

                {/* Display user's name and email */}
                <div className="mb-4">
                    <p className="text-gray-700 text-lg mb-1">
                        <span className="font-semibold">Name:</span> {userName || "N/A"}
                    </p>
                    <p className="text-gray-700 text-lg">
                        <span className="font-semibold">Email:</span> {userEmail || "N/A"}
                    </p>
                </div>

                {/* Navigation button to return to characters page */}
                <button
                    onClick={() => navigate("/characters")}
                    className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
                >
                    ← Back to Characters
                </button>
            </div>
        </div>
    );
}

export default Profile;
