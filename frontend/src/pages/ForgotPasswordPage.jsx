import React from 'react'
import { assets } from '../assets/assets.js'

const ForgotPasswordPage = () => {
  return (
    <div className="h-screen w-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${assets.background})` }}>
      <div className=' w-[300px] md:w-[500px] h-auto bg-white rounded-md shadow-md '>
        <div className='form-details p-4'>
          <div>
            <h1 className='text-2xl font-semibold'>Forgot Your Password? Rest Your Access Here</h1>
            <div className='inputs flex flex-col gap-4 pt-2 items-center'>
              <input type="email" placeholder='Email' className='w-full border text-sm p-2' />
              <button className='border rounded-full w-[45%] p-2 text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition duration-300'>Send code</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
