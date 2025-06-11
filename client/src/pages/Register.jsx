function Register() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            type="text"
            placeholder="Name"
          />
          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            type="email"
            placeholder="Email"
          />
          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Register
          </button>
        <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
                Login
            </a>
        </p>
        </form>
      </div>
    );
  }
  
  export default Register;
  