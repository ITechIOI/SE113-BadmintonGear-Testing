"use client";
import React, { useState, useEffect } from 'react'
import CheckOutItem from '@/components/CheckOutItem';
import { createOrder } from '@/api/orderApi';
import { createOrderDetail } from '@/api/orderDetailApi';
import { createPayment } from '@/api/paymentApi';
import { deleteCart } from '@/api/cartApi';
import { getPromotionByCode } from '@/api/promotionApi';

export default function CheckOut() {
    const [profile, setProfile] = useState({});
    const [items, setItems] = useState([]);
    const [discount, setDiscount] = useState({});
    const [promotion, setPromotion] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
    const shipping = 0;
    const [couponCode, setCouponCode] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const profileData = localStorage.getItem('user_profile');
            setProfile(profileData ? JSON.parse(profileData) : {});
            const checkoutItems = localStorage.getItem('checkout_items');
            const parsedItems = checkoutItems ? JSON.parse(checkoutItems) : [];
            setItems(parsedItems);
            const discountData = localStorage.getItem('discount');
            const parsedDiscount = discountData ? JSON.parse(discountData) : {};
            setDiscount(parsedDiscount);
            setPromotion(parsedDiscount.percent || 0);
            setSubtotal(parsedItems.reduce((acc, item) => acc + (item.subtotal || 0), 0));
        }
    }, []);

    const getPromotions = async () => {
        if (couponCode === "") {
            setPromotion(0);
            return;
        }
        const promotionData = await getPromotionByCode(couponCode);
        if (promotionData) {
            if (subtotal >= promotionData.minOrderValue) {
                setPromotion(promotionData.percent);
                setDiscount(promotionData);
            }
            else {
                alert(`Minimum order value for this promotion is ${promotionData.minOrderValue.toLocaleString()} VND`);
                setPromotion(0);
            }
        } else {
            alert("Invalid coupon code");
            setPromotion(0);
        }
    }
    function postAndRedirect(url, data) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;

        Object.keys(data).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    }

    const handleCreateOrder = async () => {
        const orderData = {
            totalPrice: subtotal + shipping - promotion * subtotal / 100,
            status: "pending",
            address: address,
            phone: phone,
            userId: profile.id,
        };

        if (discount.id) {
            orderData.discountId = discount.id; // Thêm mã giảm giá vào đơn hàng
        }

        const newOrder = await createOrder(orderData);
        if (newOrder) {
            // Create order details
            for (const item of items) {
                const orderDetail = {
                    quantity: item.quantity,
                    productId: item.productId,
                    orderId: newOrder.id,
                };
                await createOrderDetail(orderDetail);
                if (item.id) {
                    await deleteCart(item.id);
                }
            }
            // Create payment
            const paymentData = {
                orderId: newOrder.id,
                amount: subtotal + shipping - promotion * subtotal / 100,
                paymentMethod: paymentMethod,
                status: "pending",
            };
            if (paymentMethod === 'Paypal') {
                const paymentRes = await createPayment(paymentData);

                if (paymentRes) {
                    window.location.href = paymentRes;
                    return;
                } 
            }
            alert("Order placed successfully!");
            window.location.href = '/'; // chuyển hướng đến trang đơn hàng
        } else {
            alert("Failed to place order");
        }
    }

    const handlePlaceOrder = () => {
        if (!address || !phone) {
            alert("Please fill in all required fields.");
            return;
        }
        if (items.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        handleCreateOrder();
    }

    return (
        <div className='max-w-[1800px] mx-auto'>
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
                        <div className='w-2/3 mt-5'>
                            {items.length === 0 ? (
                                <p className='text-gray-500'>No items in the cart</p>) : (
                                items.map((item, index) => (
                                    <CheckOutItem key={index} item={item} />
                                ))
                            )}

                        </div>
                        <div className='w-2/3 rounded-md py-5 flex flex-col'>
                            <div className='border-b border-gray-500 flex justify-between pb-3 mb-3'>
                                <p className='text-left'>Subtotal:</p>
                                <p className='text-right'>{Number(subtotal).toLocaleString()} VND</p>
                            </div>
                            <div className='border-b border-gray-500 flex justify-between pb-3 mb-3'>
                                <p className='text-left'>Shipping:</p>
                                <p className='text-right'>{shipping === 0 ? "Free" : `${Number(shipping).toLocaleString()} VND`}</p>
                            </div>
                            {promotion > 0 && (
                                <div className='border-b border-gray-500 flex justify-between pb-3 mb-3'>
                                    <p className='text-left'>Promotion:</p>
                                    <p className='text-right'>- {Number(promotion).toLocaleString()} %</p>
                                </div>
                            )}
                            <div className='flex justify-between mb-3'>
                                <p className='text-left'>Total:</p>
                                <p className='text-right'>{Number(subtotal + shipping - promotion * subtotal / 100).toLocaleString()} VND</p>
                            </div>
                        </div>
                        <div>
                            <div className='w-2/3 flex items-center justify-between mb-3'>
                                <div className='flex items-center'>
                                    <input
                                        type='radio'
                                        name='payment'
                                        value='Paypal'
                                        className='mr-2 w-5 h-5 accent-black'
                                        checked={paymentMethod === 'Paypal'}
                                        onChange={e => setPaymentMethod(e.target.value)}
                                    />
                                    <label htmlFor='paypal'>Paypal</label>
                                </div>
                            </div>
                            <div className='flex items-center mb-3'>
                                <input
                                    type='radio'
                                    name='payment'
                                    value='Cash On Delivery'
                                    className='mr-2 w-5 h-5 accent-black'
                                    checked={paymentMethod === 'Cash On Delivery'}
                                    onChange={e => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor='cod'>Cash On Delivery</label>
                            </div>
                        </div>
                        <div className='flex w-full'>
                            <input type='text' placeholder='Coupon Code' className='border border-gray-500 rounded-xs px-4 py-3 w-3/5'
                                onChange={e => {
                                    setCouponCode(e.target.value);
                                }} />
                            <button className='bg-[#FF8200] text-white rounded-xs px-10 py-3 ml-5' onClick={getPromotions}>Apply Coupon</button>
                        </div>
                    </div>
                    {/* Address */}
                    <div className='px-10'>
                        <div className='flex flex-col'>
                            <label className='text-xs text-gray-500 mb-1'>Address <span className='text-[#ff8200]'>*</span></label>
                            <input
                                type='text'
                                id='address'
                                className='bg-white rounded-xs px-4 py-2 mb-3'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-xs text-gray-500 mb-1'>Phone Number <span className='text-[#ff8200]'>*</span></label>
                            <input
                                type='text'
                                id='phone'
                                className='bg-white rounded-xs px-4 py-2 mb-5'
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <button className='bg-[#FF8200] text-white rounded-xs px-10 py-3 mt-5' onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
    )
}
