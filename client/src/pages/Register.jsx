import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch("http://localhost:5050/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Registration failed");
        return;
      }

      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          name="name"
          onChange={handleChange}
          value={form.name}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Name"
        />
        <input
          name="email"
          onChange={handleChange}
          value={form.email}
          className="w-full p-2 mb-4 border rounded"
          type="email"
          placeholder="Email"
        />
        <input
          name="password"
          onChange={handleChange}
          value={form.password}
          className="w-full p-2 mb-4 border rounded"
          type="password"
          placeholder="Password"
        />

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Register
        </button>

        {error && <p className="text-red-500 mt-2 text-sm text-center">{error}</p>}
        {successMessage && <p className="text-green-600 mt-2 text-sm text-center">{successMessage}</p>}

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
