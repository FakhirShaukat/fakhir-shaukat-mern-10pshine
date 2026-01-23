import React from 'react'
import { assets } from '../assets/assets.js'

const Dashboard = () => {
    return (
        <div className="h-full w-full   bg-[#d9d9d9]"  >
            <div className='w-full h-full bg-white rounded-lg flex  '>
                <div className='sidebar-side w-[100px] border p-4 fixed h-full'>
                    <div className='content flex flex-col justify-between items-center  '>
                        <h1 className='text-xs'>Welcome</h1>
                        <button className='mt-10'><img src={assets.add} className='w-6 md:w-8' alt="" /></button>
                    </div>
                </div>
                <div className='content-side w-full p-4 px-8  ml-[100px]'>
                    <div className='flex justify-between items-center '>
                        <div className='flex items-center border rounded-full px-3 w-full max-w-[450px]'>
                            <img src={assets.search} className='w-4 ' alt="" />
                            <input type="search" placeholder='Search' className='w-full md:w-[400px] text-xs md:text-sm p-2 outline-none rounded-full' />
                        </div>
                        <button className='border rounded-full p-2 bg-gray-400'>
                            <img src={assets.user} className='w-4 invert' alt="" />
                        </button>
                    </div>
                    <div className='notes-detail mt-6'>
                        <h1 className='text-4xl font-outfit font-semibold'>Notes</h1>
                    </div>
                    <div className='notes mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        <div className='note flex  border w-[280px] h-[250px] p-4 bg-orange-400 rounded-xl'>
                            <div>
                                <h1 className='text-lg font-semibold'>Study React Hooks</h1>
                                <p className='pt-2 text-sm'>Revise useState, useEffect, and practice building a small component using custom hooks.</p>
                                <p className='pt-2 text-sm'><span className='font-bold'>Deadline:</span> 20-Feb-2026</p>
                            </div>

                            <div className='flex justify-end items-end  gap-2'>
                                <button className='rounded-full  bg-black p-2'><img className='w-20 invert' src={assets.edit} alt="" /></button>
                            </div>
                        </div>
                        <div className='note flex  border w-[280px] h-[250px] p-4 bg-yellow-300 rounded-xl'>
                            <div>
                                <h1 className='text-lg font-semibold'>Study React Hooks</h1>
                                <p className='pt-2 text-sm'>Revise useState, useEffect, and practice building a small component using custom hooks.</p>
                                <p className='pt-2 text-sm'><span className='font-bold'>Deadline:</span> 20-Feb-2026</p>
                            </div>

                            <div className='flex justify-end items-end gap-2'>
                                <button className='rounded-full bg-black p-2'><img className='w-20 invert' src={assets.edit} alt="" /></button>
                            </div>
                        </div>
                        <div className='note flex  border w-[280px] h-[250px] p-4 bg-red-500 rounded-xl'>
                            <div>
                                <h1 className='text-lg font-semibold'>Study React Hooks</h1>
                                <p className='pt-2 text-sm'>Revise useState, useEffect, and practice building a small component using custom hooks.</p>
                                <p className='pt-2 text-sm'><span className='font-bold'>Deadline:</span> 20-Feb-2026</p>
                            </div>

                            <div className='flex justify-end items-end gap-2'>
                                <button className='rounded-full bg-black p-2'><img className='w-20 invert' src={assets.edit} alt="" /></button>
                            </div>
                        </div>
                        <div className='note flex  border w-[280px] h-[250px] p-4 bg-green-400 rounded-xl'>
                            <div>
                                <h1 className='text-lg font-semibold'>Study React Hooks</h1>
                                <p className='pt-2 text-sm'>Revise useState, useEffect, and practice building a small component using custom hooks.</p>
                                <p className='pt-2 text-sm'><span className='font-bold'>Deadline:</span> 20-Feb-2026</p>
                            </div>

                            <div className='flex justify-end items-end gap-2'>
                                <button className='rounded-full bg-black p-2'><img className='w-20 invert' src={assets.edit} alt="" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
