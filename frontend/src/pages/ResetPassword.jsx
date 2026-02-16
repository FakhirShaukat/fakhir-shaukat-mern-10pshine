import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("resetEmail");

  const handleResetPassword = async () => {
    // Basic validation
    if (!newPassword || !confirmPassword) {
      setMessage("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (!email) {
      setMessage("Email not found. Please restart password reset.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email,
          newPassword,
        }
      );

      setMessage(res.data.message);

      // Clear stored email
      localStorage.removeItem("resetEmail");

      // Redirect to login after success
      setTimeout(() => {
        alert("Password reset successful! Please log in with your new password.");
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${assets.background})` }}
    >
      <div className="w-[300px] md:w-[400px] h-auto bg-white rounded-md shadow-md">
        <div className="form-details p-4">
          <div className="flex flex-col justify-center w-full">
            <h1 className="font-pacifico text-lg text-center">Notify</h1>
            <h1 className="text-xl font-semibold pt-4">Reset Your Password</h1>
            <p className="pt-1 text-xs text-gray-400">
              Your new password must be different from the previous one
            </p>

            <div className="inputs flex flex-col gap-4 pt-6 items-center w-full">
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded text-sm p-2 focus:outline-none"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded text-sm p-2 focus:outline-none"
              />

              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="border rounded w-full p-2 text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition duration-300 disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              {message && (
                <p className="pt-2 text-sm text-center text-green-500">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
