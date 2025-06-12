// Login.jsx: Handles user authentication and redirects on success

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    // State for login form and error display
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    // Handle form input changes and update state
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle form submission and attempt login via API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:5050/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                // Show error message from server response if login fails
                setError(data.message || "Login failed");
                return;
            }

            // Store user token and email for session
            localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", form.email);

            // Redirect to characters page after successful login
            navigate("/characters");
        } catch (err) {
            // Catch any server/network errors
            setError("Server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                {/* Page heading */}
                <h1 className="text-3xl font-bold text-center mb-2">Welcome Back 👋</h1>
                <p className="text-gray-500 text-center mb-6 text-sm">
                    Please enter your details to log in
                </p>

                {/* Login form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
                    >
                        Login
                    </button>

                    {/* Show login error message */}
                    {error && (
                        <p className="text-sm text-red-500 text-center mt-2">{error}</p>
                    )}

                    {/* Link to registration page */}
                    <p className="text-sm text-center mt-4">
                        Don’t have an account?{" "}
                        <Link to="/registration" className="text-purple-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;

