import React from 'react'

export default function OrderDetailsPage() {
    return (
        <div className='px-2 py-5'>
            <div className='flex justify-between items-end'>
                <div>
                    <h1 className='text-3xl font-bold'>Add Product</h1>
                    <div id="roadmap" className="flex items-center mt-2">
                        <a className="text-[#ff8200]" href="/admin/dashboard">Dashboard</a>
                        <label className="ml-3 mr-3">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.59467 3.96967C6.30178 4.26256 6.30178 4.73744 6.59467 5.03033L10.5643 9L6.59467 12.9697C6.30178 13.2626 6.30178 13.7374 6.59467 14.0303C6.88756 14.3232 7.36244 14.3232 7.65533 14.0303L12.4205 9.26516C12.5669 9.11872 12.5669 8.88128 12.4205 8.73484L7.65533 3.96967C7.36244 3.67678 6.88756 3.67678 6.59467 3.96967Z" fill="#A3A9B6" />
                            </svg>
                        </label>
                        <a className="text-[#ff8200]" href="/admin/productlist">Product List</a>
                        <label className="ml-3 mr-3">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.59467 3.96967C6.30178 4.26256 6.30178 4.73744 6.59467 5.03033L10.5643 9L6.59467 12.9697C6.30178 13.2626 6.30178 13.7374 6.59467 14.0303C6.88756 14.3232 7.36244 14.3232 7.65533 14.0303L12.4205 9.26516C12.5669 9.11872 12.5669 8.88128 12.4205 8.73484L7.65533 3.96967C7.36244 3.67678 6.88756 3.67678 6.59467 3.96967Z" fill="#A3A9B6" />
                            </svg>
                        </label>
                        <a className="text-[#667085]" href="/admin/addproduct">Add Product</a>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <div className='rounded-md bg-white border border-[#E0E2E7] px-4 py-2 flex items-center gap-2'>
                        <select className='w-full  outline-none' name="status" id="status" defaultValue={"Processing"}>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <button className='flex gap-2 bg-[#ff8200] text-white px-4 py-2 rounded-md'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.99935 13.3333C4.99935 12.8731 5.37245 12.5 5.83268 12.5H7.49935C7.95959 12.5 8.33268 12.8731 8.33268 13.3333C8.33268 13.7936 7.95959 14.1667 7.49935 14.1667H5.83268C5.37245 14.1667 4.99935 13.7936 4.99935 13.3333Z" fill="white" />
                            <path d="M5.83268 9.16667C5.37245 9.16667 4.99935 9.53976 4.99935 10C4.99935 10.4602 5.37245 10.8333 5.83268 10.8333H10.8327C11.2929 10.8333 11.666 10.4602 11.666 10C11.666 9.53976 11.2929 9.16667 10.8327 9.16667H5.83268Z" fill="white" />
                            <path d="M4.99935 6.66667C4.99935 6.20643 5.37245 5.83333 5.83268 5.83333H10.8327C11.2929 5.83333 11.666 6.20643 11.666 6.66667C11.666 7.1269 11.2929 7.5 10.8327 7.5H5.83268C5.37245 7.5 4.99935 7.1269 4.99935 6.66667Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.66602 5.83333C1.66602 3.99238 3.1584 2.5 4.99935 2.5H11.666C13.507 2.5 14.9993 3.99238 14.9993 5.83333V8.33333H15.8327C17.2134 8.33333 18.3327 9.45262 18.3327 10.8333V15C18.3327 16.3807 17.2134 17.5 15.8327 17.5H4.99935C3.1584 17.5 1.66602 16.0076 1.66602 14.1667V5.83333ZM15.8327 15.8333C16.2929 15.8333 16.666 15.4602 16.666 15V10.8333C16.666 10.3731 16.2929 10 15.8327 10H14.9993V15C14.9993 15.4602 15.3724 15.8333 15.8327 15.8333ZM13.3327 15C13.3327 15.2922 13.3828 15.5727 13.4749 15.8333H4.99935C4.07887 15.8333 3.33268 15.0871 3.33268 14.1667V5.83333C3.33268 4.91286 4.07887 4.16667 4.99935 4.16667H11.666C12.5865 4.16667 13.3327 4.91286 13.3327 5.83333V15Z" fill="white" />
                        </svg>
                        Invoice
                    </button>
                </div>
            </div>
        </div>
    )
}
