import React, { useState } from 'react'
import Image from 'next/image'

export const ProductCard = ({product}) => {

    const [showAddToCart, setShowAddToCart] = useState(false);

    const currentPrice = product.price - (product.price * product.discount / 100);

    const handleMouseEnter = () => {
        setShowAddToCart(true);
    };

    const handleMouseLeave = () => {
        setShowAddToCart(false);
    };

    return (
        <div className='relative bg-white w-[18%] p-3 rounded-xl text-poppins'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => window.location.href = `/product?id=${product.id}`} >
            <div className='absolute top-4 left-4 bg-[#FF8200] text-white text-xs px-2 py-1 rounded'>
                -{product.discount}%
            </div>
            <div className='absolute top-4 right-4 bg-[#F5F5F5] p-2 rounded-full'>
                <Image src={"/icons/blwishlistic.png"} alt={"wish"} width={30} height={30} />
            </div>
            <Image src={product.image} alt={"Product"} width={80} height={80} className='w-full h-1/2 object-cover rounded-t-lg' />
            {showAddToCart && (
                <button className='w-[100%] absolute bottom-30 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-lg text-center'>
                    Add To Cart
                </button>
            )}
            <h3 className='font-semibold text-xl'>{product.name}</h3>
            <div className='flex items-center mt-2'>
                <p className='text-[#FF8200] text-xl'>${currentPrice}</p>
                <p className='ml-3 text-black opacity-50 text-sm line-through'>${product.price}</p>
            </div>
            <div className='flex items-center mt-2 text-xl'>
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className={index < product.rating ? 'text-[#FFAD33]' : 'text-gray-300'}>
                        ★
                    </span>
                ))}
                <div className='text-black opacity-50 ml-4'>(23)</div>
            </div>

        </div>
    )
}
