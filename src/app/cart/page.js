"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import CartItem from '@/components/CartItem';

export default function Cart() {
    const [isAllChecked, setIsAllChecked] = useState(false); // Trạng thái checkbox của thead
    const [items, setItems] = useState([
        { id: "1", product: "Product 1", image: "/images/product1.png", discount: 5, price: 50, stockStatus: true, quantity: 1, isChecked: false },
        { id: "2", product: "Product 2", image: "/images/product1.png", discount: 10, price: 100, stockStatus: true, quantity: 2, isChecked: false },
    ]);

    // Hàm xử lý khi checkbox trong thead được chọn
    const handleSelectAll = () => {
        const newCheckedState = !isAllChecked;
        setIsAllChecked(newCheckedState);
        setItems(items.map(item => ({ ...item, isChecked: newCheckedState })));
    };

    // Hàm xử lý khi checkbox trong tbody được chọn
    const handleItemCheck = (id) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, isChecked: !item.isChecked } : item
        );
        setItems(updatedItems);

        // Kiểm tra nếu tất cả các checkbox trong tbody đều được chọn
        const allChecked = updatedItems.every(item => item.isChecked);
        setIsAllChecked(allChecked);
    };

    return (
        <div>
            <div id="roadmap" className="flex items-center mt-10 ml-15">
                <a className="text-gray-500" href="/">Home</a>
                <label className="ml-3 mr-3">/</label>
                <a className="text-black" href="/cart">Cart</a>
            </div>
            <div className='px-20'>
                <table className='w-full mt-5 border-separate border-spacing-y-5'>
                    <thead>
                        <tr className='bg-white shadow-md rounded-md'>
                            <th className='py-4'>
                                <input
                                    type='checkbox'
                                    className='w-5 h-5 accent-[#ff8200]'
                                    checked={isAllChecked}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className='font-medium'>Product</th>
                            <th className='font-medium'>Price</th>
                            <th className='font-medium'>Stock Status</th>
                            <th className='font-medium'>Quantity</th>
                            <th className='font-medium'>Subtotal</th>
                            <th className='flex justify-center items-center h-full my-5'>
                                <Image src={"/icons/deleteic.png"} alt="delete" width={25} height={25} className="" />
                            </th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {items.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onCheck={() => handleItemCheck(item.id)}
                            />
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={() => window.location.href = "/"}
                    className="mt-5 text-gray-500 border border-gray-500 rounded-xs px-10 py-3 hover:bg-[#FF8200] hover:text-white transition-all duration-300 ease-in-out"
                >
                    Return to Shopping
                </button>
            </div>
        </div>
    );
}