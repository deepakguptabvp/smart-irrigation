import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="w-full max-w-xs rounded-2xl shadow-xl p-6 space-y-5 text-center">
        {/* Logo */}
        <img
          src="https://www.smartlogger.tn/smart-irrigation-admin/assets/img/brand/logo-full.png"
          alt="Logo"
          className="w-16 h-16 mb-4 mx-auto"
        />

        {/* Banner Image */}
        <img
          src="https://irrigationeurope.eu/wp-content/uploads/AdobeStock_370387366-Copie.jpg"
          alt="Smart Farming"
          className="rounded-lg w-full h-28 object-cover"
        />

        {/* Welcome Text */}
        <h1 className="text-xl font-semibold text-green-800">
          Welcome Farmer!
        </h1>
        <p className="text-sm text-gray-600">Grow smarter with technology.</p>

        {/* Buttons */}
        <div className="flex flex-col space-y-3 mt-4">
          <Link to="/otplogin">
            <button className="w-full bg-green-600 text-white py-2 rounded-lg text-base font-medium shadow-md hover:bg-green-700 transition duration-200">
              🌾 Existing User - Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="w-full border border-green-600 text-green-700 py-2 rounded-lg text-base font-medium hover:bg-green-100 transition duration-200">
              🧑‍🌾 New User - Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
