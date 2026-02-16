import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect} from "react";
import { assets } from '../assets/assets.js'

const ForgotPasswordPage = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      const saveEmail = localStorage.setItem("resetEmail", email); // Save email to localStorage for later use
      // Move to verify code page
      navigate("/verify", { state: { email } });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="h-screen w-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${assets.background})` }}>
      <div className=' w-[300px] md:w-[400px] h-auto bg-white rounded-md shadow-md '>
        <div className='form-details p-4'>
          <div>
            <h1 className="text-center font-pacifico text-lg">Notify</h1>
            <h1 className='text-xl font-semibold pt-4'>Forgot your password? </h1>
            <p className='pt-1 text-xs text-gray-400'>Enter your email address and we'll send you a code to reset your password</p>
            <div className='inputs flex flex-col gap-4 pt-4 items-center'>
              <input type="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value)} className='w-full border rounded text-sm p-2 focus:outline-none' />
              <button onClick={handleSendCode} className='border rounded w-[45%] p-2 text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition duration-300'>{loading ? "Sending..." : "Send Code"}</button>
              <a href="/" className='mt-2 text-[10px] text-gray-500 font-outfit underline text-center'>Back to login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
