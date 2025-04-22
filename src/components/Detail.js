import React from 'react'
import Image from 'next/image';

export default function OrderDetailItem(item) {
    const currentPrice = item.item.price - (item.item.price * item.item.discount / 100);
    return (
        <tr className='bg-[#efefef] shadow-md rounded-md'>
            <td className='w-1/4'>
                <div className='flex items-center justify-center gap-5'>
                    <Image src={item.item.image} alt="Product" width={70} height={70} className='w-20 h-20 object-contain rounded-lg p-2' />
                    <label className='font-medium'>{item.item.product}</label>
                </div></td>
            <td>
                <div className='flex gap-3 justify-center'>
                    <p>${currentPrice}</p>
                    <p className='line-through text-gray-500'>${item.item.discount===0?"":item.item.price}</p>
                </div>
            </td>
            <td >{item.item.quantity}</td>
            <td>${item.item.price*item.item.quantity}</td>
        </tr>
    )
}
