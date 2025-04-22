import React from 'react'
import Image from 'next/image'

export default function CheckOutItem(item) {
    return (
        <div className='flex items-center justify-between mb-3'>
            <div className='flex items-center'>
                <Image src={item.item.image} alt={item.item.product} width={50} height={50} className='rounded-md mr-3' />
                <p>{item.item.product}</p>
            </div>
            <div>${item.item.subtotal}</div>
        </div>
    )
}
