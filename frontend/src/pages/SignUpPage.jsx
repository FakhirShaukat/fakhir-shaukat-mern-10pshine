import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from "react";
import { assets } from '../assets/assets.js'

const SignUpPage = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Registration Successful! Please login.");
    navigate("/");
  } catch (error) {
    alert("Server error");
  }
};

  return (
    <div className="h-screen w-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${assets.background})` }}>
      <div className=' w-[300px] md:w-[500px] h-auto bg-white rounded-md shadow-md '>
        <div className='form-details p-4'>
          <div>
            <h1 className="text-center font-pacifico text-2xl">Notify</h1>
            <h1 className='text-xl font-semibold pt-4'>Create New Account</h1>
            <p className='pt-1 text-xs text-gray-400'>Quickly organize your thoughts by creating an account</p>
            <div className='inputs flex flex-col gap-4 pt-4'>
              <div className='flex gap-4'>
                <input type="text" placeholder='First Name' name='firstName' onChange={handleChange} className='border rounded text-sm p-2 w-full focus:outline-none' />
                <input type="text" placeholder='Last Name' name='lastName' onChange={handleChange} className='border rounded text-sm p-2 w-full focus:outline-none' />
              </div>

              <input type="text" placeholder='Phone Number' name='phone' onChange={handleChange} className='border rounded text-sm p-2 focus:outline-none' />
              <input type="email" placeholder='Email' name='email' onChange={handleChange} className='border rounded text-sm p-2 focus:outline-none' />
              <input type="password" placeholder='Password' name='password' onChange={handleChange} className='border rounded text-sm p-2 focus:outline-none' />
              <div className='flex flex-col items-center justify-center'>
                <button onClick={handleRegister} className='rounded p-2 text-sm w-[85%] font-semibold bg-blue-500 text-white hover:bg-blue-600 transition duration-300'>Register</button>
              <a href="/" className='mt-4 text-[10px] text-gray-500 font-outfit underline text-center'>Back to login</a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUpPage
