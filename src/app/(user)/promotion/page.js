"use client"
import React, { useState, useEffect } from 'react'
import Cookies from "js-cookie";
import PromotionItem from '@/components/PromotionItem';

export default function PromotionPage() {
    const [promotion, setPromotion] = useState([
        { id: "1", discount: 10, start: "2025-04-20", end: "2025-05-20", code: "ABC123", name: "Promotion 1" },
        { id: "2", discount: 20, start: "2025-06-01", end: "2025-06-30", code: "DEF456", name: "Promotion 2" },
        { id: "3", discount: 30, start: "2025-07-01", end: "2025-07-31", code: "GHI789", name: "Promotion 3" },
        { id: "4", discount: 40, start: "2025-08-01", end: "2025-08-31", code: "JKL012", name: "Promotion 4" },
        { id: "5", discount: 50, start: "2025-09-01", end: "2025-09-30", code: "MNO345", name: "Promotion 5" },
        { id: "6", discount: 60, start: "2025-10-01", end: "2025-10-31", code: "PQR678", name: "Promotion 6" },
        { id: "7", discount: 70, start: "2025-11-01", end: "2025-11-30", code: "STU901", name: "Promotion 7" },        
    ]); // Khởi tạo state cho danh sách phiếu giảm giá
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
                    <a className="text-black" href="/order">My Orders</a>
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
                    <a href='/order' >My Orders</a>
                    <div className='text-gray-500 font-normal ml-3 flex flex-col gap-2'>
                        <a href='/completion'>My Completions</a>
                        <a href='/cancellation'>My Cancellations</a>
                    </div>
                    <a href='/wishlist'>My WishList</a>
                    <a href='/promotion' className='text-[#ff8200]'>My Promotions</a>
                </div>
                <div className='w-full bg-white pb-10'>
                    <p className='text-[#ff8200] text-xl mt-10 w-4/5 mx-auto'>My Promotions</p>

                    <div className='w-4/5 mx-auto mt-5 grid grid-cols-3 gap-5'>
                        {promotion.map((promo) => (
                            <PromotionItem key={promo.id} promo={promo} />
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}
