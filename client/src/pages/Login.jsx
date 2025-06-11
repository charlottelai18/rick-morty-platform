function Login() {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form>
            <input
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              type="text"
              placeholder="Username"
            />
            <input
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              type="password"
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <p className="mt-4 text-sm text-center">
                Don’t have an account?{" "}
                <a href="/registration" className="text-blue-500 hover:underline">
                    Register
                </a>
            </p>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;
  