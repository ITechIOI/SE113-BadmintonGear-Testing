import React from 'react'

export default function OrderItem(item) {
    return (
        <tr className='bg-[#efefef] shadow-md rounded-md'>
            <td className='w-1/4'>{item.item.id}</td>
            <td>{item.item.total}</td>
            <td className={item.item.state === "On Delivery" ? "text-[#ff8200]"
                : (item.item.state === "Done" ? "text-[#08AC45]" : "text-[#EA4335]")} >
                {item.item.state}</td>
            <td className='w-1/4'>
                <div className='flex gap-2 justify-center items-center py-3'>
                    {item.item.state === "Done" &&
                        <button className='bg-[#ff8200] text-white rounded-xs px-2 py-1'>Rate</button>}
                    {(item.item.state === "Cancelled" || item.item.state === "Done") &&
                        <button className='bg-[#08AC45] text-white px-2 py-1 rounded-xs'>Buy Again</button>}
                    {item.item.state === "On Delivery" &&
                        <button className='bg-[#EA4335] text-white px-2 py-1 rounded-xs'>Cancel</button>}
                </div>
            </td>
        </tr>
    )
}
