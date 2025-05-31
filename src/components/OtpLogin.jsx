import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = () => {
    // simulate send OTP
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // simulate OTP verification
      navigate("/addfield")
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="w-full max-w-xs rounded-2xl shadow-xl p-6 space-y-5 text-center">
        {/* Logo */}
        <img
          src="https://www.smartlogger.tn/smart-irrigation-admin/assets/img/brand/logo-full.png"
          alt="Logo"
          className="w-16 h-16 mx-auto"
        />

        {/* Banner */}
        <img
          src="https://irrigationeurope.eu/wp-content/uploads/AdobeStock_370387366-Copie.jpg"
          alt="Agri"
          className="rounded-lg w-full h-28 object-cover"
        />

        {/* Title */}
        <h2 className="text-lg font-semibold text-green-800">Login via OTP</h2>

        {!otpSent ? (
          <>
            {/* Phone Input */}
            <input
              type="tel"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="📱 Enter Phone Number"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Send OTP Button */}
            <button
              onClick={handleSendOtp}
              disabled={!phone}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium shadow hover:bg-green-700 transition disabled:opacity-50"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            {/* OTP Input */}
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="🔢 Enter OTP"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Verify OTP Button */}
            <button
              onClick={handleVerifyOtp}
              disabled={!otp}
              className="w-full mt-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
