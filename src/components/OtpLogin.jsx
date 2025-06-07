import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import UserAxiosAPI from "../api/userAxiosAPI";
import { webState } from "../App";

export default function OtpLogin({ }) {
  const [phone, setPhone] = useState("");
  const { user, setUser, setField } = useContext(webState);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const axios = UserAxiosAPI();

  // Load OTPless SDK
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

  // Initialize OTPless
  const initializeOtpless = () => {
    if (!window.OTPless) return;

    const callback = (eventCallback) => {
      const eventHandlers = {
        OTP_AUTO_READ: () => {
          const {
            response: { otp },
          } = eventCallback;
          setOtp(otp);
          toast.success("OTP auto-read");
        },
        FAILED: () => console.error("Authentication Failed", eventCallback),
        FALLBACK_TRIGGERED: () =>
          console.warn("Fallback Triggered", eventCallback),
      };

      if (eventHandlers[eventCallback.responseType]) {
        eventHandlers[eventCallback.responseType]();
      }
    };

    window.OTPlessSignin = new window.OTPless(callback);
  };

  // Send OTP
  const handleSendOtp = () => {
    if (!window.OTPlessSignin || !phone.trim()) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    window.OTPlessSignin.initiate({
      channel: "PHONE",
      phone,
      countryCode: "+91",
    });

    setOtpSent(true);
    toast.success("OTP sent!");
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    // if (!otp || otp.length < 6) {
    //   toast.error("Invalid OTP");
    //   return;
    // }

    setLoading(true);
    try {
      // const response = await window.OTPlessSignin.verify({
      //   channel: "PHONE",
      //   phone,
      //   otp,
      //   countryCode: "+91",
      // });

      // if (response.success === true) {
      //   toast.success("OTP Verified");

      // Call your login API
      const { data } = await axios.post("/user/login", {
        phone,
        type: "PHONE",
      });
      if (data?.success) {
        toast.success(data?.message || "Login successful");
        setUser(data?.user);
        // setField(data?.user?.fields?.[0]);
        Cookies.set("SIUserToken", data?.token, { expires: 30 });
        if (data?.user?.fields?.length) {
          navigate("/landingpage");
          window.location.reload();
        } else {
          navigate("/addfield");
        }
      } else {
        toast.error(data?.message || "Login failed");
      }
      // } else {
      //   toast.error(response?.errorMessage || "Verification failed");
      // }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
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

        {/* {!otpSent ? ( */}
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
            onClick={handleVerifyOtp}
            disabled={!phone || loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-medium shadow hover:bg-green-700 transition disabled:opacity-50"
          >
            {!loading ? "Continue without OTP" : "Please wait..."}
          </button>
        </>
        {/* ) : (
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
              onClick={handleVerifyOtp}
              disabled={!otp || loading}
              className="w-full mt-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )} */}
      </div>
    </div>
  );
}
