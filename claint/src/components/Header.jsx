import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Title */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200 transition">
            Task Manager
          </Link>
        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm md:text-base">
          <Link
            to="/"
            className="hover:underline text-gray-300 hover:text-white transition"
          >
            Home
          </Link>
          {!isLoggedIn && (
            <>
              <Link
                to="/register"
                className="hover:underline text-gray-300 hover:text-white transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="hover:underline text-gray-300 hover:text-white transition"
              >
                Login
              </Link>
            </>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-full transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
