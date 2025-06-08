import React from 'react'
import Image from 'next/image'
import { getLinkImage } from '@/api/splitService';

export default function ReviewItem({ review }) {
    console.log(review);
    const image = "/images/user1.png";
    return (
        <div key={review.id} className='w-full border-b border-gray-400 py-2 flex items-start justify-between'>
            <div className='flex flex-col gap-2 '>
                <div className='flex items-center gap-2'>
                    <Image src={review.user && review.user.avatar ? getLinkImage(review.user.avatar) : "/images/noavatar.png"} width={50} height={50} alt={review.username} className='rounded-full' />
                    <div className='flex flex-col'>
                        <p>{review.user ? review.user.name : ""}</p>
                        <div className='flex items-center text-xl'>
                            {Array.from({ length: 5 }, (_, index) => (
                                <span key={index} className={index < review.rating ? 'text-[#FFAD33]' : 'text-gray-300'}>
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
                <p className='text-gray-700'>{review.content}</p>
            </div>
            <p>{review.date}</p>
        </div>
    )
}
