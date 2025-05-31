import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { getOrderByUserId } from '@/api/orderApi';

export default function CustomerItem({ customer }) {
    const router = useRouter();
    function getAvatarLink(avatar) {
        if (!avatar) return "";
        return avatar.split(" ")[0];
    }

    return (
        <tr className='bg-white shadow-md border-b border-[#F0F1F3]' onClick={() => router.push(`/admin/customerdetail?id=${customer.id}`)}>
            <td className='flex w-fit'>
                <div className='flex items-center gap-3 py-4 px-2 text-left'>
                    <Image src={(customer && customer.avatar && getAvatarLink(customer.avatar)) || "/images/noavatar.png"} alt="customer" width={50} height={50} className='rounded-full' />
                    <div>
                        <h1 className='text-[#344054] font-semibold'>{customer.name}</h1>
                        <p className='text-[#667085] text-sm'>{customer.username}</p>
                    </div>
                </div>
            </td>
            <td className='py-4'>{customer.email}</td>
            <td className='py-4'>{customer.gender}</td>
            <td className='py-4'>{customer.phone}</td>
            <td className='py-4'>{customer.roles}</td>
        </tr>
    )
}
