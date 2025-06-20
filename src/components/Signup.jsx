import React, { useState } from "react";
import OTPVerification from "./OTPVerification";
import { blocks, districts } from "./data";

export default function SignupForm({ user, setUser }) {
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    state: "",
    district: "",
    tehsil: "",
    village: "",
    language: "",
    phone: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const states = [...new Set(districts?.map(data => data.state))];
  const cities = [
    ...new Map(
      districts?.map(item => [`${item.district}-${item.state}`, { city: item.district, state: item.state }])
    ).values()
  ];
  const districtBlockPairs = blocks.flatMap(district =>
    district.blockList.map(block => ({
      district: district.name,
      block: block.name
    }))
  );
  const handleChange = (e) => {
    const { name, value } = e.target;

    // For phone and pincode, allow only digits
    if (name === "phone" || name === "pincode") {
      if (!/^\d*$/.test(value)) return; // Reject non-digits
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone) {
      newErrors.phone = "Mobile number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Mobile number must be exactly 10 digits";
    }
    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (formData.pincode.length !== 6) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }
    if (!formData.age) {
      newErrors.age = "Age is required";
    }
    if (!formData.state) {
      newErrors.state = "State is required";
    }
    if (!formData.district) {
      newErrors.district = "District is required";
    }
    if (!formData.tehsil) {
      newErrors.tehsil = "Block/Tehsil is required";
    }
    if (!formData.village) {
      newErrors.village = "Village is required";
    }
    if (!formData.language) {
      newErrors.language = "Language preference is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowOtpScreen(true);
    }
  };
  if (showOtpScreen) {
    return <OTPVerification formData={formData} user={user} setUser={setUser} />;
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className=" w-full max-w-sm rounded-2xl shadow-xl p-6 space-y-5"
        noValidate
      >

        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <img
              src="https://www.smartlogger.tn/smart-irrigation-admin/assets/img/brand/logo-full.png"
              alt="Logo"
              className="w-16 h-16 "
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center text-green-800">
          Create Account
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Fill your information below
        </p>

        {/* Fields */}
        <div>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-400" : "focus:ring-green-400"
              }`}
            required
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            name="phone"
            type="tel"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.phone ? "border-red-500 focus:ring-red-400" : "focus:ring-green-400"
              }`}
            required
          />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <input
            name="pincode"
            type="text"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            maxLength={6}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.pincode ? "border-red-500 focus:ring-red-400" : "focus:ring-green-400"
              }`}
            required
          />
          {errors.pincode && <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>}
        </div>

        <div>
          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md text-gray-700 ${errors.age ? "border-red-500" : ""
              }`}
            required
          >
            <option value="">Select Age</option>
            {[...Array(83)].map((_, i) => (
              <option key={i + 18} value={i + 18}>
                {i + 18}
              </option>
            ))}
          </select>
          {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
        </div>

        <div>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md text-gray-700 ${errors.state ? "border-red-500" : ""
              }`}
            required
          >
            <option value="">State</option>
            {states.sort((a, b) => a.localeCompare(b)).map((state, ndx) => <option key={ndx} value={state}>{state}</option>)}
            {/* Add more */}
          </select>
          {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
        </div>

        <div>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md text-gray-700 ${errors.district ? "border-red-500" : ""
              }`}
            required
          >
            <option value="">District</option>
            {cities
              .filter((data) => formData.state !== "" ? data.state === formData.state : data.state) // ✅ Filter only if state is selected
              .sort((a, b) => a.city.localeCompare(b.city)) // ✅ Sort cities alphabetically
              .map((data, ndx) => (
                <option key={ndx} value={data.city}>
                  {data.city}
                </option>
              ))}

          </select>
          {errors.district && <p className="text-red-600 text-sm mt-1">{errors.district}</p>}
        </div>

        <div>
          <select
            name="tehsil"
            value={formData.tehsil}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md text-gray-700 ${errors.tehsil ? "border-red-500" : ""
              }`}
            required
          >
            <option value="">Block/Tehsil</option>
            {districtBlockPairs
              ?.filter((item) => item.district.toLowerCase() === formData.district.toLowerCase())
              .sort((a, b) => a.block.localeCompare(b.block))
              .map((item, index) => (
                <option key={index} value={item.block}>
                  {item.block}
                </option>
              ))}
          </select>
          {errors.tehsil && (
            <p className="text-red-600 text-sm mt-1">{errors.tehsil}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="village"
            value={formData.village}
            onChange={handleChange}
            placeholder="Village"
            className={`w-full px-4 py-2 border rounded-md text-gray-700 ${errors.village ? "border-red-500" : ""
              }`}
            required
          />
          {errors.village && (
            <p className="text-red-600 text-sm mt-1">{errors.village}</p>
          )}
        </div>


        <div>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md text-gray-700 ${errors.language ? "border-red-500" : ""
              }`}
            required
          >
            <option value="">Language Preference</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
          </select>
          {errors.language && <p className="text-red-600 text-sm mt-1">{errors.language}</p>}
        </div>

        {/* Proceed Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Proceed →
        </button>
      </form>
    </div>
  );
}
