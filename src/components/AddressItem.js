import React from 'react'

export default function AddressItem(item) {
    return (
        <tr className='bg-[#efefef] shadow-md rounded-md'>
            <td>{item.item.name}</td>
            <td>{item.item.address}</td>
            <td>{item.item.phone}</td>
            <td>{item.item.email}</td>
            <td>
                <div className='flex flex-col gap-2 justify-center items-center py-3'>
                    <button className='bg-[#ff8200] text-white rounded-xs w-4/5 mx-auto py-1'>Update</button>
                    <button className='bg-[#EA4335] text-white w-4/5 mx-auto py-1 rounded-xs'>Delete</button>
                </div>
            </td>
        </tr>
    )
}
