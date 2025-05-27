import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6 py-10">
      {/* Logo */}
      <img
        src="https://www.smartlogger.tn/smart-irrigation-admin/assets/img/brand/logo-full.png"
        alt="Logo"
        className="w-16 h-16 mb-4"
      />

      {/* Welcome */}
      <h1 className="text-2xl font-bold text-green-800 mb-2 text-center">
        Welcome to Smart Irrigation App
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Empowering Farmers with Technology
      </p>

      {/* Illustration */}
      <img
        src="https://irrigationeurope.eu/wp-content/uploads/AdobeStock_370387366-Copie.jpg"
        alt="Farm Tech"
        className="rounded-xl shadow-md w-full max-w-xs mb-8"
      />

      {/* CTA Button */}
      <button
        onClick={handleStart}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition w-full max-w-xs"
      >
        Get Started
      </button>
    </div>
  );
}
