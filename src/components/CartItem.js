import React from 'react';
import Image from 'next/image';
import { getLinkImage } from '@/api/splitService';
import { updateCart } from '@/api/cartApi';

export default function CartItem({ item, onCheck, onDelete, onQuantityChange }) {
    const price = item.product.price;

    const handleQuantityChange = async (event) => {
        const newQuantity = Number(event.target.value);
        await updateCart(item.id, { quantity: newQuantity });
        if (onQuantityChange) onQuantityChange(item.id, newQuantity);
    };

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
                    <Image src={item.product && item.product.imageUrl ? getLinkImage(item.product.imageUrl) : "/images/placeholder.png"} alt="Product" width={90} height={90} className='w-20 h-20 object-contain rounded-lg' />
                    <label className='font-medium'>{item.product.name}</label>
                </div>
            </td>
            <td>
                <div className='flex items-center justify-center gap-5'>
                    <p>{Number(price).toLocaleString()} VND</p>
                    {item.product.discount > 0 && (
                        <p className='text-black opacity-50 text-sm line-through'>{Number(item.product.price).toLocaleString()} VND</p>
                    )}
                </div>
            </td>
            <td className={item.product.quantity > 0 ? 'text-[#08AC45]' : 'text-[#EB2F06]'}>
                {item.product.quantity > 0 ? "In Stock" : "Out Of Stock"}
            </td>
            <td>
                <div>
                    <input
                        onChange={handleQuantityChange}
                        type='number'
                        min={1}
                        max={100}
                        className='px-1 py-2 text-center border border-gray-500 rounded-xs'
                        value={item.quantity}
                        disabled={item.product.quantity === 0}
                    />
                </div>
            </td>
            <td>{Number(item.quantity * price).toLocaleString()} VND</td>
            <td className='flex justify-center items-center h-full my-5'>
                <Image src={item.product.quantity > 0 ? "/icons/deleteic.png" : "/icons/outdeleteic.png"} alt='delete' width={25} height={25} onClick={onDelete} />
            </td>
        </tr>
    );
}