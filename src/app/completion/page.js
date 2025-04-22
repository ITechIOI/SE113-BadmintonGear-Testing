"use client"
import React, { useState, useEffect } from 'react'
import Cookies from "js-cookie";
import OrderItem from '@/components/OrderItem';

export default function CompletionOrderPage() {
    const [order, setOrder] = useState([
        { id: "1", total: 123, state: "Done" },
        { id: "2", total: 789, state: "Done" },
        { id: "3", total: 234, state: "Done" },
        { id: "4", total: 567, state: "Done" },
    ]); // Khởi tạo state cho danh sách dơn hàng đã giao hàng thành công
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
                <div >Welcome! <span className='text-[#ff8200]'>{user ? `${user.username} !` : ""}</span></div>
            </div>
            <div className='mx-20 grid grid-cols-[20%_1fr] gap-5 mt-10'>
                <div className='flex flex-col gap-3 font-medium' >
                    <a href='/account'>Manage My Account</a>
                    <div className='text-gray-500 font-normal ml-3 flex flex-col gap-2'>
                        <a href='/account' >My Profile</a>
                        <a href='address' >Address Book</a>
                    </div>
                    <a href='/order'>My Orders</a>
                    <div className='text-gray-500 font-normal ml-3 flex flex-col gap-2'>
                        <a href='/completion'  className='text-[#ff8200]'>My Completions</a>
                        <a href='/cancellation'>My Cancellations</a>
                    </div>
                    <a href='/wishlist'>My WishList</a>
                    <a href='/promotion'>My Promotions</a>
                </div>
                <div className='w-full bg-white pb-10'>
                    <p className='text-[#ff8200] text-xl mt-10 w-4/5 mx-auto'>My Completions</p>

                    <table className='w-full mt-5 border-separate border-spacing-y-5'>
                        <thead>
                            <tr className='bg-[#efefef] shadow-md rounded-md'>
                                <th className='font-medium py-3'>ID</th>
                                <th className='font-medium'>Total</th>
                                <th className='font-medium'>State</th>
                                <th className='font-medium'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='w-full text-center'>
                            {order.map((item) =>
                                (<OrderItem key={item.id} item={item} />))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
