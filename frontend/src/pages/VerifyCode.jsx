import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import axios from "axios";

const VerifyCode = () => {
  const navigate = useNavigate();
  const getEmail = localStorage.getItem("resetEmail");

  // State for email, code and messages
  const [email, setEmail] = useState(""); // you can prefill if coming from forgot page
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-reset-code", {
        email: getEmail,
        code,
      });
      setMessage(res.data.message);

      if (res.status === 200) {
        alert("Code verified!");
        navigate("/reset", { state: { email } });
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${assets.background})` }}
    >
      <div className="w-[300px] md:w-[400px] h-auto bg-white rounded-md shadow-md">
        <div className="form-details p-4">
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="font-pacifico text-lg">Notify</h1>
            <h1 className="text-xl font-semibold pt-4">
              Enter verification code
            </h1>
            <p className="pt-1 text-gray-400 text-xs">
              We've sent a code to{" "}
              <strong className="font-semibold">{getEmail || "your email"}</strong>
            </p>
            <div className="inputs flex flex-col gap-4 pt-6 items-center w-full">
              <input type="text" placeholder="Enter the 6-digit code" value={code} onChange={(e) => setCode(e.target.value)} className="w-full border rounded text-sm p-2 focus:outline-none"/>
              <div className="flex justify-between gap-2 w-full">
                <button className="border rounded w-full p-2 text-sm font-semibold bg-white hover:bg-gray-200 transition duration-300">
                  <a href="/forgot">Cancel</a>
                </button>
                <button onClick={handleVerify} className="border rounded w-full p-2 text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                  Verify
                </button>
              </div>
              {message && <p className="pt-2 text-red-500 text-xs font-outfit">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
