// Register.jsx: Form to register a new user and store info for future login

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    // State to hold form inputs: name, email, password
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    // State to display error or success messages to the user
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Updates form state on input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handles form submission and registration logic
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior
        setError("");
        setSuccessMessage("");

        try {
            // Send POST request to backend to register user
            const res = await fetch("https://rick-morty-platform.onrender.com/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            // If registration fails, show error from response
            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Registration failed");
                return;
            }

            // On success, store user info locally and show success message
            localStorage.setItem("userName", form.name);
            localStorage.setItem("userEmail", form.email);

            setSuccessMessage("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/"), 1000); // Redirect after short delay
        } catch (err) {
            setError("Server error"); // Fallback error message
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-indigo-100 to-purple-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                {/* Title and intro text */}
                <h1 className="text-3xl font-bold text-center mb-2">Create an Account 🚀</h1>
                <p className="text-gray-500 text-center mb-6 text-sm">
                    Join us and explore the multiverse!
                </p>

                {/* Registration form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
                    >
                        Register
                    </button>

                    {/* Feedback messages */}
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    {successMessage && <p className="text-sm text-green-600 text-center">{successMessage}</p>}

                    {/* Link to login page */}
                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/" className="text-purple-500 hover:underline">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
