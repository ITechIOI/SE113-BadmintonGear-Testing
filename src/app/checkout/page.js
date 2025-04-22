import React from 'react'

export default function CheckOut() {
    const subtotal = 0; // calculate subtotal from items in cart
    const shipping = 0; // calculate shipping from items in cart
    return (
        <div>
            <div id="roadmap" className="flex items-center mt-10 ml-15">
                <a className="text-gray-500" href="/">Home</a>
                <label className="ml-3 mr-3">/</label>
                <a className="text-gray-500" href="/cart">Cart</a>
                <label className="ml-3 mr-3">/</label>
                <a className="text-black" href="/cart">CheckOut</a>
            </div>
            <div className='mx-20 mt-5'>
                <div className='text-3xl font-medium'>Billing Details</div>
                <div className='grid grid-col lg:grid-cols-2 gap-5 mt-5'>
                    <div>
                        {/* List of Product */}
                        <div>

                        </div>
                        <div className='w-2/3 rounded-md py-5 flex flex-col'>
                            <div className='border-b border-gray-500 flex justify-between pb-3 mb-3'>
                                <p className='text-left'>Subtotal:</p>
                                <p className='text-right'>${subtotal}</p>
                            </div>
                            <div className='border-b border-gray-500 flex justify-between pb-3 mb-3'>
                                <p className='text-left'>Shipping:</p>
                                <p className='text-right'>{shipping === 0 ? "Free" : `$${shipping}`}</p>
                            </div>
                            <div className='flex justify-between mb-3'>
                                <p className='text-left'>Total:</p>
                                <p className='text-right'>${subtotal + shipping}</p>
                            </div>
                        </div>
                        <div>
                            <div className=' w-2/3 flex items-center justify-between mb-3'>
                                <div className='flex items-center'>
                                    <input type='radio' name='payment' value='credit' className='mr-2 w-5 h-5 accent-black' />
                                    <label htmlFor='credit'>Bank</label>
                                </div>
                                {/* Image of bank */}
                                <div>


                                </div>
                            </div>
                            <div className='flex items center mb-3'>
                                <input type='radio' name='payment' value='paypal' className='mr-2 w-5 h-5 accent-black' />
                                <label htmlFor='paypal'>Cash On Delivery</label>
                            </div>
                        </div>
                        <div className='flex w-full'>
                            <input type='text' placeholder='Coupon Code' className='border border-gray-500 rounded-xs px-4 py-3 w-3/5' />
                            <button className='bg-[#FF8200] text-white rounded-xs px-10 py-3 ml-5'>Apply Coupon</button>
                        </div>
                    </div>
                    {/* Address */}
                    <div className='px-10'>
                        <div className='flex flex-col'>
                            <label className='text-xs text-gray-500 mb-1'>Choose Shipping Address <span className='text-[#ff8200]'>*</span></label>
                            {/* <input type='text' id='idaddress'  className='bg-white rounded-xs px-4 py-2 mb-3' /> */}
                            <select id='idaddress' className='bg-white rounded-xs px-4 py-2 mb-3'>
                                <option value=''>Select Address</option>
                                <option value='address1'>Address 1</option>
                                <option value='address2'>Address 2</option>
                                <option value='address3'>Address 3</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-xs text-gray-500 mb-1'>Full Name <span className='text-[#ff8200]'>*</span></label>
                            <input type='text' id='name' className='bg-white rounded-xs px-4 py-2 mb-3' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-xs text-gray-500 mb-1'>Address <span className='text-[#ff8200]'>*</span></label>
                            <input type='text' id='address' className='bg-white rounded-xs px-4 py-2 mb-3' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-xs text-gray-500 mb-1'>Phone Number <span className='text-[#ff8200]'>*</span></label>
                            <input type='text' id='phone' className='bg-white rounded-xs px-4 py-2 mb-5' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-xs text-gray-500 mb-1'>Email <span className='text-[#ff8200]'>*</span></label>
                            <input type='text' id='email' className='bg-white rounded-xs px-4 py-2 mb-5' />
                        </div>
                    </div>
                </div>
                <button className='bg-[#FF8200] text-white rounded-xs px-10 py-3 mt-5'>Place Order</button>

            </div>
        </div>
    )
}
