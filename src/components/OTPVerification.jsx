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
  const [reqId, setReqId] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const timerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

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

  const sendOtp = async () => {
    if (!formData.phone || formData.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      setSending(true);
      const { data } = await axios.post("/otp/send-otp", {
        phone: formData.phone,
      });

      if (data?.success) {
        toast.success(data.message?.sms || "OTP sent successfully!");
        setMessage("OTP sent successfully!");
        setReqId(data.reqId);
        setError("");
        startResendTimer();
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Error sending OTP");
      console.error("SEND OTP ERROR:", err);
    } finally {
      setSending(false);
    }
  };

  const verifyAndCreateAccount = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setVerifying(true);
    setError("");

    try {
      const { data } = await axios.post("/otp/verify-otp", {
        phone: formData.phone,
        otp,
        reqId,
      });

      if (data?.success) {
        // toast.success("OTP Verified!");

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
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-6 rounded shadow-xl w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">Verify Your Number</h2>

        {!reqId ? (
          <button
            onClick={sendOtp}
            disabled={sending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            {sending ? "Sending OTP..." : "Send OTP to Verify"}
          </button>
        ) : (
          <>
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
              disabled={verifying}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
            >
              {verifying ? "Verifying..." : "Verify & Create Account"}
            </button>

            <button
              onClick={sendOtp}
              disabled={resendTimer > 0 || sending}
              className={`w-full py-2 rounded-md text-white transition ${
                resendTimer > 0 || sending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {sending
                ? "Sending OTP..."
                : resendTimer > 0
                ? `Resend OTP in ${resendTimer}s`
                : "Resend OTP"}
            </button>
          </>
        )}

        {error && <p className="text-center text-red-600">{error}</p>}
        {message && <p className="text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}
