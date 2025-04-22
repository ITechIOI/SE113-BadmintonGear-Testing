import React from 'react';
import Image from 'next/image';

export default function CartItem({ item, onCheck }) {
    const price = item.price - (item.price * item.discount / 100);

    return (
        <tr className='bg-white shadow-md rounded-md mt-3 w-full align-middle text-center'>
            <td>
                <input
                    type='checkbox'
                    className='w-5 h-5 accent-[#ff8200]'
                    checked={item.isChecked}
                    onChange={onCheck}
                />
            </td>
            <td>
                <div className='flex items-center justify-center gap-5'>
                    <Image src={item.image} alt="Product" width={90} height={90} className='w-20 h-20 object-contain rounded-lg' />
                    <label className='font-medium'>{item.product}</label>
                </div>
            </td>
            <td>
                <div className='flex items-center justify-center gap-5'>
                    <p>${price}</p>
                    <p className='text-gray-500 line-through'>{item.discount === 0 ? '' : `$${item.price}`}</p>
                </div>
            </td>
            <td className={item.stockStatus ? 'text-[#08AC45]' : 'text-[#EB2F06]'}>
                {item.stockStatus ? "In Stock" : "Out Of Stock"}
            </td>
            <td>
                <div>
                    <input
                        type='number'
                        min={1}
                        max={100}
                        className='px-1 py-2 text-center border border-gray-500 rounded-xs'
                        defaultValue={item.quantity}
                        disabled={!item.stockStatus}
                    />
                </div>
            </td>
            <td>${price * item.quantity}</td>
            <td className='flex justify-center items-center h-full my-5'>
                <Image src={item.stockStatus ? "/icons/deleteic.png" : "/icons/outdeleteic.png"} alt='delete' width={25} height={25} />
            </td>
        </tr>
    );
}