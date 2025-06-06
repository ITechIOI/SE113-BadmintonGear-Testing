"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CartItem from '@/components/CartItem';
import { getCart, deleteCart } from '@/api/cartApi';
import { getAllProducts } from '@/api/productApi';
import { getPromotionByCode } from '@/api/promotionApi';

export default function Cart() {
    const [subtotal, setSubtotal] = useState(0);
    const shipping = 0;
    const [isAllChecked, setIsAllChecked] = useState(false); // Trạng thái checkbox của thead
    const [products, setProducts] = useState([]); // Danh sách sản phẩm
    const [items, setItems] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [promotion, setPromotion] = useState(0);
    const [discount, setDiscount] = useState({});

    const fetchCartItems = async (productsList) => {
        const cartItems = await getCart();
        if (cartItems) {
            setItems(cartItems.map(item => {
                // Tìm product theo id từ mảng productsList
                const productInfo = productsList.find(p => p.id === item.productId || (item.product && p.id === item.product.id));
                return {
                    ...item,
                    isChecked: false,
                    subtotal: item.quantity * (productInfo ? productInfo.price : item.product.price),
                    product: {
                        ...(productInfo || item.product),
                        imageUrl: (productInfo && productInfo.imageUrl) || (item.product && item.product.imageUrl) || "/images/placeholder.png"
                    }
                }
            }));
        }
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
        fetchData(); // Cập nhật lại dữ liệu sau khi thay đổi số lượng
    };

    const deleteCartItem = async (id) => {
        const response = await deleteCart(id);
        if (response) {
            alert('Delete cart item successfully');
            setItems(items.filter(item => item.id !== id));
            if (items.length === 1) {
                setIsAllChecked(false);
            }
        }
    }

    const handleDeleteAllCartItems = async () => {
        const deletePromises = items.map(item => deleteCartItem(item.id));
        await Promise.all(deletePromises);
        setItems([]);
    }
    // const fetchProducts = async () => {
    //     const response = await getAllProducts();
    //     setProducts(response || []);
    // };

    const getPromotions = async () => {
        if (couponCode === "") {
            setPromotion(0);
            return;
        }
        const promotionData = await getPromotionByCode(couponCode);
        if (promotionData) {
            console.log("Promotion data:", promotionData);
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

    const fetchData = async () => {
        const productsList = await getAllProducts();
        setProducts(productsList || []);
        await new Promise(resolve => setTimeout(resolve, 500));
        await fetchCartItems(productsList || []);
    };

    // Hàm xử lý khi checkbox trong thead được chọn
    const handleSelectAll = () => {
        const newCheckedState = !isAllChecked;
        setIsAllChecked(newCheckedState);
        setItems(items.map(item => ({ ...item, isChecked: newCheckedState })));
    };

    // Hàm xử lý khi checkbox trong tbody được chọn
    const handleItemCheck = (id) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, isChecked: !item.isChecked } : item
        );
        setItems(updatedItems);

        // Kiểm tra nếu tất cả các checkbox trong tbody đều được chọn
        const allChecked = updatedItems.every(item => item.isChecked);
        setIsAllChecked(allChecked);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const checkedItems = items.filter(item => item.isChecked);
        const total = checkedItems.reduce((acc, item) => acc + item.subtotal, 0);
        setSubtotal(total);
    }, [items]);

    return (
        <div className='max-w-[1800px] mx-auto'>
            <div id="roadmap" className="flex items-center mt-10 ml-15">
                <a className="text-gray-500" href="/">Home</a>
                <label className="ml-3 mr-3">/</label>
                <a className="text-black" href="/cart">Cart</a>
            </div>
            <div className='px-20'>
                <table className='w-full mt-5 border-separate border-spacing-y-5'>
                    <thead>
                        <tr className='bg-white shadow-md rounded-md'>
                            <th className='py-4'>
                                <input
                                    type='checkbox'
                                    className='w-5 h-5 accent-[#ff8200]'
                                    checked={isAllChecked}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className='font-medium'>Product</th>
                            <th className='font-medium'>Price</th>
                            <th className='font-medium'>Stock Status</th>
                            <th className='font-medium'>Quantity</th>
                            <th className='font-medium'>Subtotal</th>
                            <th className='flex justify-center items-center h-full my-5'>
                                <Image src={"/icons/deleteic.png"} alt="delete" width={25} height={25} className="" onClick={handleDeleteAllCartItems} />
                            </th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {items.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onCheck={() => handleItemCheck(item.id)}
                                onDelete={() => deleteCartItem(item.id)}
                                onQuantityChange={handleQuantityChange}
                            />
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={() => window.location.href = "/"}
                    className="mt-5 text-gray-500 border border-gray-500 rounded-xs px-10 py-3 hover:bg-[#FF8200] hover:text-white transition-all duration-300 ease-in-out"
                >
                    Return to Shopping
                </button>
                <div className='flex justify-between items-start mt-5'>
                    <div className='flex w-1/2'>
                        <input type='text' placeholder='Coupon Code' className='border border-gray-500 rounded-xs px-4 py-3 w-3/5'
                            onChange={e => {
                                setCouponCode(e.target.value);
                            }} />
                        <button className='bg-[#FF8200] text-white rounded-xs px-10 py-3 ml-5 cursor-pointer disabled:cursor-not-allowed'
                            disabled={couponCode === ""}
                            onClick={getPromotions}>Apply Coupon</button>
                    </div>
                    <div className='w-1/3 border-2 rounded-md px-10 py-5 flex flex-col'>
                        <label className='w-full text-lg font-medium mb-5 text-center'>Cart Total</label>
                        <div className='border-b border-gray-500 flex justify-between pb-3 mb-3'>
                            <p className='text-left'>Subtotal:</p>
                            <p className='text-right'>{Number(subtotal).toLocaleString()} VND</p>
                        </div>
                        <div className='border-b border-gray-500 flex justify-between pb-3 mb-3'>
                            <p className='text-left'>Shipping:</p>
                            <p className='text-right'>{shipping === 0 ? "Free" : `${Number(shipping).toLocaleString()}`} VND</p>
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
                        <button className='bg-[#FF8200] text-white rounded-xs px-10 py-3 mt-5 w-fit mx-auto'
                            onClick={() => {
                                const checkedItems = items.filter(item => item.isChecked);
                                if (checkedItems.length === 0) {
                                    alert("Please select at least one item to checkout!");
                                    return;
                                }
                                localStorage.setItem('checkout_items', JSON.stringify(checkedItems));
                                localStorage.setItem('discount', JSON.stringify(discount));
                                window.location.href = "/checkout";
                            }}>Process To Check Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}