import React from 'react'
import { assets } from '../assets/assets.js'

const SignUpPage = () => {
  return (
    <div className="h-screen w-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${assets.background})` }}>
      <div className=' w-[300px] md:w-[500px] h-auto bg-white rounded-md shadow-md '>
        <div className='form-details p-4'>
          <div>
            <h1 className='text-2xl font-semibold'>Create New Account</h1>
            <p className='pt-2 text-xs text-gray-400'>Take notes and organize your thoughts</p>
            <div className='inputs flex flex-col gap-4 pt-2'>
              <input type="text" placeholder='First Name' className='border text-sm p-2' />
              <input type="text" placeholder='Last Name' className='border text-sm p-2' />
              <input type="email" placeholder='Email' className='border text-sm p-2' />
              <input type="password" placeholder='Password' className='border text-sm p-2' />
              <button className='border p-2 text-sm font-semibold bg-blue-500 text-white'>Register</button>
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
