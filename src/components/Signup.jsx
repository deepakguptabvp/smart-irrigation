import React, { useState } from 'react';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    state: '',
    district: '',
    tehsil: '',
    village: '',
    language: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert('Form Submitted:\n' + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 space-y-5"
      >
        {/* Logo */}
        <img
          src="https://www.smartlogger.tn/smart-irrigation-admin/assets/img/brand/logo-full.png"
          alt="Logo"
          className="w-12 h-12"
        />

        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center text-green-800">Create Account</h2>
        <p className="text-sm text-gray-600 text-center">Fill your information below</p>

        {/* Fields */}
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 " required
        />

        <select
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md text-gray-700" required
        >
          <option value="">Select Age</option>
          {[...Array(83)].map((_, i) => (
            <option key={i + 18}>{i + 18}</option>
          ))}
        </select>

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md text-gray-700" required
        >
          <option value="">State</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          {/* Add more */}
        </select>

        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md text-gray-700" required
        >
          <option value="">District</option>
          <option value="Lucknow">Lucknow</option>
          <option value="Pune">Pune</option>
        </select>

        <select
          name="tehsil"
          value={formData.tehsil}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md text-gray-700" required
        >
          <option value="">Block/Tehsil</option>
          <option value="Bakshi Ka Talab">Bakshi Ka Talab</option>
        </select>

        <select
          name="village"
          value={formData.village}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md text-gray-700" required
        >
          <option value="">Village</option>
          <option value="Rampur">Rampur</option>
        </select>

        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md text-gray-700" required
        >
          <option value="">Language Preference</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
        </select>

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
