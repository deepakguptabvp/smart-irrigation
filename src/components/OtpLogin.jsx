import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import UserAxiosAPI from "../api/userAxiosAPI";
import { webState } from "../App";

export default function OtpLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(webState);
  const navigate = useNavigate();
  const axios = UserAxiosAPI();

  const sendOtp = async () => {
    if (!phone || phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/otp/send-otp", { phone });
      if (data.success) {
        toast.success("OTP sent successfully");
        setOtpSent(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("SEND OTP ERROR", error);
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Invalid OTP");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/otp/verify-otp", { phone, otp });
      if (data.success) {
        toast.success(data.message || "Login successful");
        console.log(data.user)
        setUser(data.user);
        Cookies.set("SIUserToken", data.token, { expires: 30 });

        navigate(data.user?.fields?.length ? "/landingpage" : "/addfield");
        window.location.reload();
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("VERIFY OTP ERROR", error);
      toast.error("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="w-full max-w-xs rounded-2xl shadow-xl p-6 space-y-5 text-center">
        <img
          src="https://www.smartlogger.tn/smart-irrigation-admin/assets/img/brand/logo-full.png"
          alt="Logo"
          className="w-16 h-16 mx-auto"
        />
        <img
          src="https://irrigationeurope.eu/wp-content/uploads/AdobeStock_370387366-Copie.jpg"
          alt="Agri"
          className="rounded-lg w-full h-28 object-cover"
        />
        <h2 className="text-lg font-semibold text-green-800">Login via OTP</h2>

        {!otpSent ? (
          <>
            <input
              type="tel"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="📱 Enter Phone Number"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium shadow hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="🔢 Enter OTP"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full mt-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
