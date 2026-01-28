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
            <h1 className='text-2xl font-semibold'>Create New Account</h1>
            <p className='pt-2 text-xs text-gray-400'>Take notes and organize your thoughts</p>
            <div className='inputs flex flex-col gap-4 pt-2'>
              <div className='flex gap-4'>
                <input type="text" placeholder='First Name' name='firstName' onChange={handleChange} className='border text-sm p-2 w-full' />
                <input type="text" placeholder='Last Name' name='lastName' onChange={handleChange} className='border text-sm p-2 w-full' />
              </div>

              <input type="text" placeholder='Phone Number' name='phone' onChange={handleChange} className='border text-sm p-2' />
              <input type="email" placeholder='Email' name='email' onChange={handleChange} className='border text-sm p-2' />
              <input type="password" placeholder='Password' name='password' onChange={handleChange} className='border text-sm p-2' />
              <button onClick={handleRegister} className='border p-2 text-sm font-semibold bg-blue-500 text-white'>Register</button>
            </div>
            <div className='divider flex justify-center items-center gap-2 pt-2 text-sm text-gray-400'>
              <div className='bg-gray-300 flex-1 h-px'></div>
              <div>OR</div>
              <div className='bg-gray-300 flex-1 h-px'></div>
            </div>
            <div className='google-signUp mt-2 p-2 border text-center bg-red-500'>
              <button className='text-xs text-white font-semibold'>Continue with Google</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUpPage
