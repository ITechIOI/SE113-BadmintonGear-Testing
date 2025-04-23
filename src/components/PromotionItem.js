import React from 'react'

export default function PromotionItem({promo}) {
    return (
        <div>
            <div className='w-full h-40 bg-[#f5f5f5] rounded-md shadow-md flex flex-col justify-between p-5'>
                <div className='flex justify-between'>
                    <p className='text-xl font-semibold'>{promo.name}</p>
                    <p className='text-[#ff8200] text-xl font-semibold'>{promo.discount}%</p>
                </div>
                <div className='justify-between'>
                    <p className='text-gray-500'>Code: {promo.code}</p>
                    <p className='text-gray-500'>{promo.start} - {promo.end}</p>
                </div>
            </div>
        </div>
    )
}
