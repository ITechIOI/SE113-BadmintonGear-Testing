"use client"
import React, { useState, useEffect } from 'react'
import Cookies from "js-cookie";

export default function Account() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = Cookies.get("user"); // Lấy thông tin người dùng từ cookie
        if (storedUser) {
            setUser(storedUser); // Nếu có dữ liệu, cập nhật state `user`
        }
    }, []);
    return (
        <div>
            <div className='flex justify-between mr-20 mt-10 '>
                <div id="roadmap" className="flex items-center ml-15">
                    <a className="text-gray-500" href="/">Home</a>
                    <label className="ml-3 mr-3">/</label>
                    <a className="text-black" href="/cart">Cart</a>
                </div>
                <div >Welcome! <span className='text-[#ff8200]'>{user?`${user.username} !`:""}</span></div>
            </div>
            <div className='mx-20 grid grid-cols-[20%_1fr] gap-5 mt-10'>
                <div className='flex flex-col gap-3 font-medium' >
                    <a href='/account'>Manage My Account</a>
                    <div className='text-gray-500 font-normal ml-3 flex flex-col gap-2'>
                        <a href='/account' className='text-[#ff8200]'>My Profile</a>
                        <a href='address'>Address Book</a>
                    </div>
                    <a href='/order'>My Orders</a>
                    <div className='text-gray-500 font-normal ml-3 flex flex-col gap-2'>
                        <a href='/completion'>My Completions</a>
                        <a href='/cancellation'>My Cancellations</a>
                    </div>
                    <a href='/wishlist'>My WishList</a>
                    <a href='/promotion'>My Promotions</a>
                </div>
                <div className='w-full bg-white pb-10'>
                    <div className='mt-10 mx-auto w-4/5'>
                        <p className='text-[#ff8200] text-xl'>Edit Your Profile</p>
                        <div className='flex flex-col gap-1 mt-5'>
                            <label className='text-gray-500'>Name</label>
                            <input type="text" className='bg-gray-100 rounded-xs p-2' defaultValue={user?user.name:""}/>
                        </div>
                        <div className='flex w-full gap-5 mt-5 justify-between'>
                            <div className='flex flex-col gap-1 w-3/7'>
                                <label className='text-gray-500 '>Email</label>
                                <input type="text" className='bg-gray-100 rounded-xs p-2' defaultValue={user?user.email:""}/>
                            </div>
                            <div className='flex flex-col gap-1 w-3/7'>
                                <label className='text-gray-500'>Phone Number</label>
                                <input type="text" className='bg-gray-100 rounded-xs p-2' defaultValue={user?user.phone:""}/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mt-5'>
                            <label className='text-gray-500'>Password Change</label>
                            <input type="password" className='bg-gray-100 rounded-xs p-2' placeholder='Current Password'/>
                            <input type="text" className='bg-gray-100 rounded-xs p-2' placeholder='New Password'/>
                            <input type="text" className='bg-gray-100 rounded-xs p-2' placeholder='Confirm New Password'/>
                        </div>
                        <div className='flex justify-end gap-5 items-center mt-5 mr-5'>
                            <button className='px-4 py-2 rounded-xs'>Cancel</button>
                            <button className='bg-[#ff8200] text-white px-4 py-2 rounded-xs'>Save Changes</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
