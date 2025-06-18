import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserAxiosAPI from "../api/userAxiosAPI";
import Cookies from "js-cookie";

export default function OTPVerification({ formData, user, setUser }) {
  const navigate = useNavigate();
  const axios = UserAxiosAPI();

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [reqId, setReqId] = useState(""); // New: storing reqId
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  // Start resend timer
  const startResendTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setResendTimer(60);
    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Send OTP
  const sendOtp = async () => {
    if (!formData.phone || formData.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/otp/send-otp", {
        phone: formData.phone,
      });

      if (data?.success) {
        toast.success(data.message?.sms || "OTP sent successfully!");
        setMessage("OTP sent successfully!");
        setReqId(data.reqId); // Save reqId for verification
        setError("");
        startResendTimer();
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Error sending OTP");
      console.error("SEND OTP ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and create account
  const verifyAndCreateAccount = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("/otp/verify-otp", {
        phone: formData.phone,
        otp,
        reqId, // optional, backend can validate against this
      });

      if (data?.success) {
        toast.success("OTP Verified!");

        // Call signup API
        const res = await axios.post("/user/signup", {
          ...formData,
          phone: formData.phone,
        });

        if (res.data?.success) {
          setUser(res.data.user);
          toast.success(res.data.message || "Account created!");
          Cookies.set("SIUserToken", res.data.token, { expires: 30 });
          navigate("/addfield");
          window.location.reload();
        } else {
          toast.error(res.data.message || "Signup failed");
        }
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
      console.error("VERIFY OTP ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // Send OTP on mount (optional)
  useEffect(() => {
    sendOtp();
    return () => clearInterval(timerRef.current); // Cleanup
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-6 rounded shadow-xl w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">Verify Your Number</h2>
        <p className="text-sm text-center text-gray-500">
          Enter the 6-digit OTP sent to your phone
        </p>

        <input
          type="text"
          maxLength={6}
          pattern="\d{6}"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val) && val.length <= 6) {
              setOtp(val);
            }
          }}
          className="w-full px-4 py-2 border rounded-md text-center text-lg tracking-widest"
        />

        <button
          onClick={verifyAndCreateAccount}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
        >
          {loading ? "Verifying..." : "Verify & Create Account"}
        </button>

        <button
          onClick={sendOtp}
          disabled={resendTimer > 0}
          className={`w-full py-2 rounded-md text-white transition ${
            resendTimer > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
        </button>

        {error && <p className="text-center text-red-600">{error}</p>}
        {message && <p className="text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}
