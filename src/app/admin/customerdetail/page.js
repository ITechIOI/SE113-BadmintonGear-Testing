"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import AdminOrderItem from '@/components/AdminOrderItem';
import { useSearchParams } from 'next/navigation';
import { getUserById } from '@/api/userApi';
import { getOrderByUserId } from '@/api/orderApi';

export default function CustomerDetailPage() {
    const params = useSearchParams();
    const customerId = params.get('id');
    const [orders, setOrders] = useState([]);
    const [displayOrders, setDisplayOrders] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [orderCount, setOrderCount] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const fetchCustomerData = async (id) => {
        const response = await getUserById(id);
        console.log("Fetched Customer Data:", response);
        if (!response) {
            setCustomer(null);
        }
        else {
            setCustomer(response);
        }
    }

    const fetchOrders = async () => {
        const response = await getOrderByUserId(customerId);
        console.log("Fetched Orders:", response);
        if (response) {
            setOrders(response);
            setDisplayOrders(response);
            setOrderCount(response.length);
            const total = response.reduce((acc, order) => acc + order.totalPrice, 0);
            setTotalBalance(total.toFixed(2)); // Assuming totalPrice is a number
        } else {
            setOrders([]);
        }
    }

    const filterOrdersByDate = () => {
        if (startDate) {
            let filteredOrders = [];
            const endDateObj = endDate
                ? new Date(new Date(endDate).setHours(23, 59, 59, 999))
                : null;
            if (!endDate) {
                filteredOrders = orders.filter(order => {
                    const orderDate = new Date(order.createdAt);
                    return orderDate >= new Date(startDate);
                });
            } else {
                filteredOrders = orders.filter(order => {
                    const orderDate = new Date(order.createdAt);
                    return (
                        orderDate >= new Date(startDate) &&
                        orderDate <= endDateObj
                    );
                });
            }
            setDisplayOrders(filteredOrders);
        } else {
            if (endDate) {
                const endDateObj = new Date(new Date(endDate).setHours(23, 59, 59, 999));
                const filteredOrders = orders.filter(order => {
                    const orderDate = new Date(order.createdAt);
                    return orderDate <= endDateObj;
                });
                setDisplayOrders(filteredOrders);
            }
            console.log('No date selected, displaying all orders');
            setDisplayOrders(orders);
        }
    }

    useEffect(() => {
        if (customerId) {
            fetchCustomerData(customerId);
            fetchOrders();
        }
    }, [customerId]);

    function getAvatarLink(avatar) {
        if (!avatar) return "";
        return avatar.split(" ")[0];
    }

    return (
        <div className='px-2 py-5'>
            <div>
                <h1 className='text-3xl font-bold'>Customer Detail</h1>
                <div id="roadmap" className="flex items-center mt-2">
                    <a className="text-[#ff8200]" href="/admin/dashboard">Dashboard</a>
                    <label className="ml-3 mr-3">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.59467 3.96967C6.30178 4.26256 6.30178 4.73744 6.59467 5.03033L10.5643 9L6.59467 12.9697C6.30178 13.2626 6.30178 13.7374 6.59467 14.0303C6.88756 14.3232 7.36244 14.3232 7.65533 14.0303L12.4205 9.26516C12.5669 9.11872 12.5669 8.88128 12.4205 8.73484L7.65533 3.96967C7.36244 3.67678 6.88756 3.67678 6.59467 3.96967Z" fill="#A3A9B6" />
                        </svg>
                    </label>
                    <a className="text-[#ff8200]" href="/admin/customer">Customer List</a>
                    <label className="ml-3 mr-3">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.59467 3.96967C6.30178 4.26256 6.30178 4.73744 6.59467 5.03033L10.5643 9L6.59467 12.9697C6.30178 13.2626 6.30178 13.7374 6.59467 14.0303C6.88756 14.3232 7.36244 14.3232 7.65533 14.0303L12.4205 9.26516C12.5669 9.11872 12.5669 8.88128 12.4205 8.73484L7.65533 3.96967C7.36244 3.67678 6.88756 3.67678 6.59467 3.96967Z" fill="#A3A9B6" />
                        </svg>
                    </label>
                    <a className="text-[#667085]" href="/admin/customerdetail">Customer Details</a>
                </div>
            </div>
            <div className='flex gap-5 mt-5'>
                <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden w-1/3 p-1">
                    <div className="bg-[#ff8200] h-35 w-full rounded-sm"></div>
                    <div className="flex flex-col items-center -mt-20">
                        <Image src={(customer && customer.avatar && getAvatarLink(customer.avatar)) || "/images/noavatar.png"} alt="customer" width={150} height={150} className="rounded-full border-4 border-white" />
                        <h2 className="mt-2 text-lg font-semibold text-gray-800">{customer ? customer.name : ""}</h2>
                        <p className="text-sm text-gray-500">{customer ? customer.username : ""}</p>
                    </div>
                    <hr className="my-5 border-gray-300" />
                    <div className="mt-6 px-6 py-4 text-sm text-gray-700 space-y-4">
                        <div className="flex items-center gap-2">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#E0E2E7" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#F0F1F3" strokeWidth="4" />
                                <path d="M21 24.3681C21.3069 24.0934 21.5 23.6942 21.5 23.25C21.5 22.4216 20.8284 21.75 20 21.75C19.1716 21.75 18.5 22.4216 18.5 23.25C18.5 23.6942 18.6931 24.0934 19 24.3681V25.25C19 25.8023 19.4477 26.25 20 26.25C20.5523 26.25 21 25.8023 21 25.25V24.3681Z" fill="#667085" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M14 18V16C14 12.6863 16.6863 10 20 10C23.3137 10 26 12.6863 26 16V18C27.6569 18 29 19.3431 29 21V27C29 28.6569 27.6569 30 26 30H14C12.3431 30 11 28.6569 11 27V21C11 19.3431 12.3431 18 14 18ZM24 16V18H16V16C16 13.7909 17.7909 12 20 12C22.2091 12 24 13.7909 24 16ZM14 20C13.4477 20 13 20.4477 13 21V27C13 27.5523 13.4477 28 14 28H26C26.5523 28 27 27.5523 27 27V21C27 20.4477 26.5523 20 26 20H14Z" fill="#667085" />
                            </svg>
                            <div className='flex flex-col justify-start'>
                                <span className="font-medium text-gray-500">User ID</span>
                                <span className=" text-black">{customer ? customer.id + " - " + customer.roles : ""}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#E0E2E7" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#F0F1F3" strokeWidth="4" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 15C10 13.3431 11.3431 12 13 12H27C28.6569 12 30 13.3431 30 15V25C30 26.6569 28.6569 28 27 28H13C11.3431 28 10 26.6569 10 25V15ZM26.3334 14H13.6667L19.4 18.3C19.7556 18.5667 20.2445 18.5667 20.6 18.3L26.3334 14ZM12 15.25V25C12 25.5523 12.4477 26 13 26H27C27.5523 26 28 25.5523 28 25V15.25L21.8 19.9C20.7334 20.7 19.2667 20.7 18.2 19.9L12 15.25Z" fill="#667085" />
                            </svg>
                            <div className='flex flex-col justify-start'>
                                <span className="font-medium text-gray-500">Email</span>
                                <span className=" text-black">{customer ? customer.email : ""}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#E0E2E7" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#F0F1F3" strokeWidth="4" />
                                <g clipPath="url(#clip0_368_7219)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M27.9724 26.6595L25.0225 23.7097L23.0764 26.2869L22.3693 26.0078L22.3648 26.006L22.356 26.0025L22.3258 25.9903C22.3002 25.9799 22.2639 25.965 22.2179 25.9456C22.1258 25.907 21.9947 25.8506 21.8326 25.7776C21.5089 25.6317 21.0593 25.4182 20.55 25.1451C19.5457 24.6065 18.2493 23.8047 17.2404 22.7958C16.2315 21.7869 15.4296 20.4904 14.891 19.486C14.6178 18.9767 14.4043 18.5271 14.2584 18.2034C14.1854 18.0413 14.129 17.9101 14.0903 17.8181C14.071 17.772 14.056 17.7357 14.0456 17.7102L14.0334 17.68L14.0299 17.6712L14.0284 17.6674L13.749 16.9596L16.3263 15.0134L13.3765 12.0636C12.7916 13.0194 12.0391 14.6448 12.0343 16.6657C12.0293 18.7616 12.8272 21.4138 15.7248 24.3114C18.6224 27.209 21.2746 28.0069 23.3704 28.0018C25.3913 27.997 27.0166 27.2444 27.9724 26.6595ZM16.1918 17.621L17.5315 16.6094C18.5007 15.8776 18.5992 14.4579 17.7405 13.5992L14.7044 10.5631C13.9148 9.7735 12.4898 9.73464 11.7862 10.8347C11.0741 11.9482 10.0406 14.0138 10.0343 16.661C10.0279 19.3443 11.0778 22.4929 14.3106 25.7256C17.5433 28.9584 20.6919 30.0083 23.3752 30.0018C26.0223 29.9955 28.0879 28.9618 29.2013 28.2497C30.3013 27.5461 30.2624 26.1211 29.4729 25.3316L26.4368 22.2954C25.578 21.4367 24.1583 21.5352 23.4265 22.5044L22.4148 23.8441C22.1562 23.7229 21.8408 23.5678 21.4952 23.3825C20.5589 22.8804 19.4607 22.1877 18.6546 21.3816C17.8485 20.5754 17.1557 19.4772 16.6535 18.5408C16.4682 18.1952 16.3131 17.8798 16.1918 17.621Z" fill="#667085" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_368_7219">
                                        <rect width="24" height="24" fill="white" transform="translate(8 8)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div className='flex flex-col justify-start'>
                                <span className="font-medium text-gray-500">Phone Number</span>
                                <span className="text-black">{customer ? customer.phone : ""}</span>
                            </div>
                        </div>
                        {/* <div className="flex items-start gap-2">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#E0E2E7" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#F0F1F3" strokeWidth="4" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M24 18C24 20.2091 22.2091 22 20 22C17.7909 22 16 20.2091 16 18C16 15.7909 17.7909 14 20 14C22.2091 14 24 15.7909 24 18ZM22 18C22 19.1046 21.1046 20 20 20C18.8954 20 18 19.1046 18 18C18 16.8954 18.8954 16 20 16C21.1046 16 22 16.8954 22 18Z" fill="#667085" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M28 18C27.9999 24.8707 22.0992 28.791 20.4332 29.7609C20.1612 29.9192 19.8388 29.9192 19.5668 29.7609C17.9008 28.791 12 24.8707 12 18C12 14 15 10 20 10C25 10 28 14 28 18ZM14 18C14 14.9372 16.2648 12 20 12C23.7352 12 26 14.9372 26 18C26 21.2825 24.3677 23.8038 22.5857 25.5858C21.7002 26.4714 20.8093 27.1401 20.1406 27.5859C20.0924 27.618 20.0455 27.6489 20 27.6785C19.9544 27.6489 19.9075 27.618 19.8594 27.5859C19.1907 27.1401 18.2998 26.4714 17.4142 25.5858C15.6322 23.8038 14 21.2825 14 18Z" fill="#667085" />
                            </svg>
                            <div className='flex flex-col justify-start'>
                                <span className="font-medium text-gray-500">Delivery Address</span>
                                <div className="text-black">1833 Bel Meadow Drive, Fontana, California 92335, USA</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#E0E2E7" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#F0F1F3" strokeWidth="4" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.638 12.1223C14.4569 11.1806 13.6329 10.5 12.674 10.5H11C10.4477 10.5 10 10.9477 10 11.5C10 12.0523 10.4477 12.5 11 12.5L12.674 12.5L14.55 22.2554C14.9122 24.1388 16.5602 25.5 18.478 25.5H24.6873C26.5044 25.5 28.0932 24.2752 28.5556 22.518L29.8068 17.7635C30.3074 15.8612 28.8726 14 26.9056 14H14.9991L14.638 12.1223ZM15.3837 16L16.514 21.8777C16.6951 22.8194 17.5191 23.5 18.478 23.5H24.6873C25.5959 23.5 26.3903 22.8876 26.6215 22.009L27.8727 17.2545C28.0395 16.6204 27.5613 16 26.9056 16H15.3837Z" fill="#667085" />
                                <path d="M16.75 29.5C15.9215 29.5 15.25 28.8284 15.25 28C15.25 27.1716 15.9215 26.5 16.75 26.5C17.5784 26.5 18.25 27.1716 18.25 28C18.25 28.8284 17.5784 29.5 16.75 29.5Z" fill="#667085" />
                                <path d="M25.5 29.5C24.6715 29.5 24 28.8284 24 28C24 27.1716 24.6715 26.5 25.5 26.5C26.3284 26.5 27 27.1716 27 28C27 28.8284 26.3284 29.5 25.5 29.5Z" fill="#667085" />
                            </svg>

                            <div className='flex flex-col justify-start'>
                                <span className="font-medium text-gray-500">Latest Transaction</span>
                                <span className=" text-black">12 December 2022</span>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className='w-full'>
                    <div className='flex justify-between items-center mb-5 gap-30'>
                        <div className='w-full bg-white rounded-md shadow-md overflow-hidden py-5 px-20 flex flex-col gap-2'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#CFE7DC" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#E7F4EE" strokeWidth="4" />
                                <path d="M23 20.5C22.4477 20.5 22 20.9477 22 21.5C22 22.0523 22.4477 22.5 23 22.5H25C25.5523 22.5 26 22.0523 26 21.5C26 20.9477 25.5523 20.5 25 20.5H23Z" fill="#0D894F" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M28 14.5C29.1046 14.5 30 15.3954 30 16.5V26C30 27.6569 28.6569 29 27 29H13C11.3431 29 10 27.6569 10 26V14C10 12.3431 11.3431 11 13 11H25C26.6569 11 28 12.3431 28 14V14.5ZM25 13H13C12.4477 13 12 13.4477 12 14V26C12 26.5523 12.4477 27 13 27H27C27.5523 27 28 26.5523 28 26V16.5H17C16.4477 16.5 16 16.0523 16 15.5C16 14.9477 16.4477 14.5 17 14.5H26V14C26 13.4477 25.5523 13 25 13Z" fill="#0D894F" />
                            </svg>
                            <span className='text-gray-600'>Total Balance</span>
                            <div className='text-xl font-semibold'>${totalBalance}</div>
                        </div>
                        <div className='w-full px-20 bg-white rounded-md shadow-md overflow-hidden py-5 flex flex-col gap-2'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#FAE1CF" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#FDF1E8" strokeWidth="4" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.638 12.1223C14.4569 11.1806 13.6329 10.5 12.674 10.5H11C10.4477 10.5 10 10.9477 10 11.5C10 12.0523 10.4477 12.5 11 12.5L12.674 12.5L14.55 22.2554C14.9122 24.1388 16.5602 25.5 18.478 25.5H24.6873C26.5044 25.5 28.0932 24.2752 28.5556 22.518L29.8068 17.7635C30.3074 15.8612 28.8726 14 26.9056 14H14.9991L14.638 12.1223ZM15.3837 16L16.514 21.8777C16.6951 22.8194 17.5191 23.5 18.478 23.5H24.6873C25.5959 23.5 26.3903 22.8876 26.6215 22.009L27.8727 17.2545C28.0395 16.6204 27.5613 16 26.9056 16H15.3837Z" fill="#E46A11" />
                                <path d="M16.75 29.5C15.9215 29.5 15.25 28.8284 15.25 28C15.25 27.1716 15.9215 26.5 16.75 26.5C17.5784 26.5 18.25 27.1716 18.25 28C18.25 28.8284 17.5784 29.5 16.75 29.5Z" fill="#E46A11" />
                                <path d="M25.5 29.5C24.6715 29.5 24 28.8284 24 28C24 27.1716 24.6715 26.5 25.5 26.5C26.3284 26.5 27 27.1716 27 28C27 28.8284 26.3284 29.5 25.5 29.5Z" fill="#E46A11" />
                            </svg>

                            <span className='text-gray-600'>Total Orders</span>
                            <div className='text-xl font-semibold'>{orderCount}</div>
                        </div>
                    </div>
                    <div className='mt-5 shadow-md bg-white rounded-md py-5'>
                        <div className='flex w-full justify-between items-center px-5'>
                            <div className='text-lg font-semibold'>Transaction History</div>
                            <div className='flex gap-5'>
                                <button className='text-[#667085] border border-[#E0E2E7] rounded-md px-4 py-2 flex items-center gap-2' onClick={() => { setShowDatePicker(!showDatePicker) }}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2.49984C7.5 2.0396 7.1269 1.6665 6.66667 1.6665C6.20643 1.6665 5.83333 2.0396 5.83333 2.49984H5C3.61929 2.49984 2.5 3.61913 2.5 4.99984V15.8332C2.5 17.2139 3.61929 18.3332 5 18.3332H15C16.3807 18.3332 17.5 17.2139 17.5 15.8332V4.99984C17.5 3.61913 16.3807 2.49984 15 2.49984H14.1667C14.1667 2.0396 13.7936 1.6665 13.3333 1.6665C12.8731 1.6665 12.5 2.0396 12.5 2.49984H7.5ZM15.8333 5.83317V4.99984C15.8333 4.5396 15.4602 4.1665 15 4.1665H14.1667C14.1667 4.62674 13.7936 4.99984 13.3333 4.99984C12.8731 4.99984 12.5 4.62674 12.5 4.1665H7.5C7.5 4.62674 7.1269 4.99984 6.66667 4.99984C6.20643 4.99984 5.83333 4.62674 5.83333 4.1665H5C4.53976 4.1665 4.16667 4.5396 4.16667 4.99984V5.83317H15.8333ZM4.16667 7.49984V15.8332C4.16667 16.2934 4.53976 16.6665 5 16.6665H15C15.4602 16.6665 15.8333 16.2934 15.8333 15.8332V7.49984H4.16667Z" fill="#667085" />
                                    </svg>
                                    Select Dates
                                </button>
                                {showDatePicker && (
                                    <div className="absolute z-50 bg-white px-10 py-5 rounded shadow flex gap-5 items-left flex-col right-10 top-60 ">
                                        <div>Choose duration:</div>
                                        <div className="flex items-between w-full gap-10">
                                            <label >From:</label>
                                            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                                        </div>
                                        <div className="w-full flex justify-between items-center ">
                                            <label>To:</label>
                                            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                                        </div>
                                        <div className="flex justify-end gap-3">
                                            <button
                                                className="px-3 py-1 bg-gray-600 text-white rounded"
                                                onClick={() => setShowDatePicker(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-[#ff8200] text-white rounded"
                                                onClick={filterOrdersByDate}
                                            >
                                                OK
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* <button className='text-[#667085] border border-[#E0E2E7] rounded-md px-4 py-2 flex items-center gap-2'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.8333 6.66667C10.8333 7.1269 11.2064 7.5 11.6667 7.5C12.1269 7.5 12.5 7.1269 12.5 6.66667V5.83333H16.6667C17.1269 5.83333 17.5 5.46024 17.5 5C17.5 4.53976 17.1269 4.16667 16.6667 4.16667H12.5V3.33333C12.5 2.8731 12.1269 2.5 11.6667 2.5C11.2064 2.5 10.8333 2.8731 10.8333 3.33333V6.66667Z" fill="#667085" />
                                        <path d="M2.5 10C2.5 9.53976 2.8731 9.16667 3.33333 9.16667H4.58333C4.81345 9.16667 5 9.35321 5 9.58333V10.4167C5 10.6468 4.81345 10.8333 4.58333 10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 10Z" fill="#667085" />
                                        <path d="M7.5 7.5C7.03976 7.5 6.66667 7.8731 6.66667 8.33333V11.6667C6.66667 12.1269 7.03976 12.5 7.5 12.5C7.96024 12.5 8.33333 12.1269 8.33333 11.6667V10.8333H16.6667C17.1269 10.8333 17.5 10.4602 17.5 10C17.5 9.53976 17.1269 9.16667 16.6667 9.16667H8.33333V8.33333C8.33333 7.8731 7.96024 7.5 7.5 7.5Z" fill="#667085" />
                                        <path d="M2.5 5C2.5 4.53976 2.8731 4.16667 3.33333 4.16667H8.75C8.98012 4.16667 9.16667 4.35321 9.16667 4.58333V5.41667C9.16667 5.64679 8.98012 5.83333 8.75 5.83333H3.33333C2.8731 5.83333 2.5 5.46024 2.5 5Z" fill="#667085" />
                                        <path d="M12.5 13.3333C12.5 12.8731 12.8731 12.5 13.3333 12.5C13.7936 12.5 14.1667 12.8731 14.1667 13.3333V14.1667H16.6667C17.1269 14.1667 17.5 14.5398 17.5 15C17.5 15.4602 17.1269 15.8333 16.6667 15.8333H14.1667V16.6667C14.1667 17.1269 13.7936 17.5 13.3333 17.5C12.8731 17.5 12.5 17.1269 12.5 16.6667V13.3333Z" fill="#667085" />
                                        <path d="M2.5 15C2.5 14.5398 2.8731 14.1667 3.33333 14.1667H10.4167C10.6468 14.1667 10.8333 14.3532 10.8333 14.5833V15.4167C10.8333 15.6468 10.6468 15.8333 10.4167 15.8333H3.33333C2.8731 15.8333 2.5 15.4602 2.5 15Z" fill="#667085" />
                                    </svg>
                                    Filters
                                </button> */}

                            </div>
                        </div>
                        <table className='w-full mt-5'>
                            <thead className='bg-[#F9FAFB] font-medium'>
                                <tr className='text-center bg-[#F9F9FC] font-semibold border-b border-[#E0E2E7]'>
                                    <th className='py-2 px-4'>OrderID</th>
                                    <th className='py-2 px-4'>Product</th>
                                    <th className='py-2 px-4'>Date</th>
                                    <th className='py-2 px-4'>Total</th>
                                    <th className='py-2 px-4'>State</th>


                                </tr>
                            </thead>
                            <tbody className='text-[#344054] font-normal text-center'>
                                {displayOrders.map((order) => (
                                    <AdminOrderItem
                                        key={order.id}
                                        order={order}
                                        button={false} />
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination*/}
                    </div>
                </div>
            </div>

        </div>
    )
}
