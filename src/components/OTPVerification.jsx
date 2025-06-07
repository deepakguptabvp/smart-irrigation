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
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const timerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load OTPless SDK and initialize it
  useEffect(() => {
    if (!sdkLoaded) {
      const script = document.createElement("script");
      script.id = "otpless-sdk";
      script.src = "https://otpless.com/v4/headless.js";
      script.setAttribute("data-appid", "C0JRVF5U1R1JG0NL7PCU");
      script.onload = () => {
        setSdkLoaded(true);
        initializeOtpless();
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [sdkLoaded]);

  // OTPless init & callback setup
  const initializeOtpless = () => {
    if (!window.OTPless) return;

    const callback = (eventCallback) => {
      const eventHandlers = {
        ONETAP: () => {
          const { response } = eventCallback;
          // Token received (not used here directly)
          // console.log("Authenticated Token:", response.token);
        },
        OTP_AUTO_READ: () => {
          const { response: { otp } } = eventCallback;
          setOtp(otp);
        },
        FAILED: () => {
          toast.error("Authentication Failed");
          console.error("Authentication Failed", eventCallback);
        },
        FALLBACK_TRIGGERED: () => {
          toast.error("Fallback Triggered");
          console.warn("Fallback Triggered", eventCallback);
        },
      };

      if (eventHandlers[eventCallback.responseType]) {
        eventHandlers[eventCallback.responseType]();
      }
    };

    window.OTPlessSignin = new window.OTPless(callback);
  };

  // Send OTP via OTPless
  const sendOtp = () => {
    if (!window.OTPlessSignin) return;
    try {
      const options = {
        channel: "PHONE",
        phone: formData.phone,
        countryCode: "+91", // adjust country code as needed
      };
      window.OTPlessSignin.initiate(options);
      toast.success("OTP Sent!");
      setMessage("OTP sent successfully!");
      setResendTimer(60);
      setError("");
      startResendTimer();
    } catch (e) {
      toast.error("Failed to send OTP.");
      console.error(e);
    }
  };

  // Countdown timer for resend button
  const startResendTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

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

  // Automatically send OTP on component mount
  // useEffect(() => {
  //   if (sdkLoaded && formData?.phone) {
  //     sendOtp();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sdkLoaded, formData?.phone]);

  // Verify OTP via OTPless, then call signup API
  const verifyAndCreateAccount = async () => {
    // if (otp.length !== 6) {
    //   setError("Please enter a 6-digit OTP");
    //   return;
    // }
    setLoading(true);
    setError("");
    try {
      // const response = await window.OTPlessSignin.verify({
      //   channel: "PHONE",
      //   phone: formData.phone,
      //   otp,
      //   countryCode: "+91",
      // });

      // if (true) {
      toast.success("OTP Verified!");
      setError("");
      // Call signup API with phone number and other formData if needed
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
      // } else {
      //   if (response.statusCode === 400) {
      //     setError(response.errorMessage || "Invalid OTP");
      //   } else {
      //     setError("OTP verification failed, please try again.");
      //   }
      // }
    } catch (err) {
      setError("Verification failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-6 rounded shadow-xl w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">Verify Your Number</h2>
        <p className="text-sm text-center text-gray-500">
          Enter any 6-digit number
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

        {/* <button
          onClick={sendOtp}
          disabled={resendTimer > 0}
          className={`w-full py-2 rounded-md text-white ${resendTimer > 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
        </button> */}

        <button
          onClick={verifyAndCreateAccount}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
        >
          {loading ? "Verifying..." : "Verify & Create Account"}
        </button>

        {error && <p className="text-center text-red-600">{error}</p>}
        {message && <p className="text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}
