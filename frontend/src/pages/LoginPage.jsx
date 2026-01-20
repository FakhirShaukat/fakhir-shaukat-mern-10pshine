import React, { use } from 'react'
import { useState,  useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const LoginPage = () => {

    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handlelogin = () =>{
        if (email === "fakhirshaukat@gmail.com" && password === "f123"){
            alert("Welcome User!")
            navigate("/dashboard");
        }else{
            alert("invalid credentials");
        }
    }


    return (
        <div className="h-screen w-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${assets.background})` }}>
            <div className=' w-[300px] md:w-[500px] h-auto bg-white rounded-md shadow-md '>
                <div className='form-details p-4'>
                    <div>
                        <h1 className='text-2xl font-semibold'>Welcome</h1>
                        <p className='pt-2 text-xs text-gray-400'>Take notes and organize your thoughts</p>
                        <div className='inputs flex flex-col gap-4 pt-2'>
                            <input  type="email" placeholder='Enter your Email' className='border text-sm p-2' onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder='Enter your Password' className='border text-sm p-2' onChange={(e) => setPassword(e.target.value)} />
                            <div className='flex flex-col items-center '>
                                <button className='flex justify-end text-xs gap-2'>Don't have an account ?<a href="/signup" className='text-blue-600 underline'> SignUp</a></button>
                                <button className='flex justify-end text-xs text-blue-600 underline'><a href="/forgot">Forgot Password ?</a></button>
                            </div>
                            <button onClick={handlelogin} className='border p-2 text-sm font-semibold bg-blue-500 text-white'>Login</button>
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

export default LoginPage
