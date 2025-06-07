import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LogoutConfirmation = ({ }) => {
    const navigate = useNavigate();
    const handleConfirm = () => {
        Cookies.remove("SIUserToken");// callback after logout
        navigate("/");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    Are you sure you want to logout?
                </h2>
                <div className="flex justify-between mt-6 space-x-4">
                    <button
                        onClick={() => navigate('/landingpage')}
                        className="w-full px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="w-full px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirmation;
