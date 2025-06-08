"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { ProductCard } from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { ReviewItem } from '@/components/ReviewItem';
import { getProductById } from '@/api/productApi';
import { getReviews } from '@/api/reviewApi';

export default function ProductPage() {
    const searchParams = useSearchParams();
    const idProduct = searchParams.get('id');
    const [descriptionVisible, setDescriptionVisible] = useState(true); // State to control the visibility of the description
    // const [additionalInfoVisible, setAdditionalInfoVisible] = useState(false); // State to control the visibility of the additional information
    const [reviewsVisible, setReviewsVisible] = useState(false); // State to control the visibility of the reviews
    const [count, setCount] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [product, setProduct] = useState({}); 
    const currentPrice = product.price; // Tính giá hiện tại của sản phẩm
    const fetchProductById = async (id) => {
        const response = await getProductById(id);
        if (response) {
            setProduct(response);
        } else {
            console.error("Failed to fetch product by ID");
        }
    }
    const fetchReviewsByProductId = async (id) => {
        const response = await getReviews(id);
        if (response) {
            setReviews(response);
        } else {
            console.error("Failed to fetch reviews for product");
        }
    }


    const handleDescriptionClick = () => {
        setDescriptionVisible(true);
        setReviewsVisible(false);
    }

    const handleReviewsClick = () => {
        setDescriptionVisible(false);
        setReviewsVisible(true);
    }
    useEffect(() => {
        const fetchData = async () => {
            if (idProduct) {
                await fetchProductById(idProduct);
                await new Promise(resolve => setTimeout(resolve, 1000));
                await fetchReviewsByProductId(idProduct);
            }
        }
        fetchData();
    }, [idProduct]);

    return (
        <div className='max-w-[1800px] mx-auto'>
            <div id="roadmap" className="flex items-center mt-10 ml-15">
                <a className="text-gray-500" href="/">Home</a>
                <label className="ml-3 mr-3">/</label>
                <a className="text-gray-500" href="/category?rackets">{product.category}</a>
                <label className="ml-3 mr-3">/</label>
                <a className="text-black" href={`/product/${product.id}`}>{product.name}</a>
            </div>
            <div className='mx-30 mt-10'>
                <div className='h-fit flex gap-10 border-b border-gray-500 pb-5'>
                    <div className='flex items-center'>
                        <div className='flex flex-col gap-5'>
                            <Image src="/images/product1.png" alt="Product Image" width={110} height={100} className="object-contain" />
                            <Image src="/images/product1.png" alt="Product Image" width={110} height={100} className="object-contain" />
                            <Image src="/images/product1.png" alt="Product Image" width={110} height={100} className="object-contain" />
                            <Image src="/images/product1.png" alt="Product Image" width={110} height={100} className="object-contain" />
                        </div>
                        <div className='ml-10 h-full'>
                            <Image src="/images/product1.png" alt="Product Image" width={500} height={500} className="object-contain h-full" />
                        </div>
                    </div>
                    <div>
                        <div className='w-full flex flex-col gap-5 border-b border-gray-500 pb-5 h-fit'>
                            <p>{product.name}</p>
                            <div className='flex items-center mt-2 text-xl gap-2'>
                                <div className='flex items-center text-xl'>
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span key={index} className={index < product.rating ? 'text-[#FFAD33]' : 'text-gray-300'}>
                                            ★
                                        </span>
                                    ))}
                                    <div className='text-black opacity-50 ml-4'>(150 reviews)</div>
                                </div>
                                <div className='text-xl'>|</div>
                                <div className={product.stockState ? "text-[#34A853] text-md" : "text-md text-[#EA4335]"}>{product.stockState ? "In Stock" : "Out Of Stock"}</div>
                            </div>
                            <div className='flex items-center mt-2'>
                                <p className='text-3xl font-semibold '>${currentPrice}</p>
                                {product.discount > 0 && <p className='ml-5 text-black opacity-50 text-lg line-through'>${product.price}</p>}
                            </div>
                            <p>{product.description}</p>
                        </div>
                        <div className='flex justify-between items-center mt-5'>
                            <div className="flex items-center border border-gray-400 rounded w-fit">
                                <button
                                    className="px-4 py-2 border-r border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => setCount(count - 1)}
                                    disabled={count <= 1} // Disable button if count is 1                                    
                                >
                                    -
                                </button>
                                <span className="px-4">{count}</span>
                                <button
                                    className="px-4 py-2 border-l border-gray-400 bg-orange-500 text-white"
                                    onClick={() => setCount(count + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button className='bg-[#FF8200] text-white rounded-xs px-7 py-3'>Buy Now</button>
                            <div className='border rounded-xs p-2'>
                                <Image src="/icons/blwishlistic.png" alt="wish" width={30} height={30} className="object-contain" />
                            </div>
                        </div>
                        <div className='w-full border rounded-xs mt-5'>
                            <div className='flex gap-2 py-3 w-full pl-1 border-b'>
                                <Image src={"/icons/fastdeliveryic.png"} alt={"fast delivery"} width={35} height={35} className='object-contain' />
                                <div>
                                    <p className='text-lg font-semibold'>Fast Delivery</p>
                                    <p className='text-xs underline'>Enter your postal code for Delivery Availability</p>
                                </div>
                            </div>
                            <div className='flex gap-2 py-3 w-full pl-1'>
                                <Image src={"/icons/returnic.png"} alt={"fast delivery"} width={35} height={35} className='object-contain' />
                                <div>
                                    <p className='text-lg font-semibold'>Return Delivery</p>
                                    <p className='text-xs'>Free 30 Days Delivery Returns. <span className='underline'>Details</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='h-fit  border-b border-gray-500 pb-5'>
                    <div className='flex items-center justify-center mx-40 gap-20 text-lg'>
                        <p className={descriptionVisible ? "font-semibold" : ""}
                            onClick={handleDescriptionClick}>Description</p>
                        <p className={reviewsVisible ? "font-semibold" : ""}
                            onClick={handleReviewsClick}>Reviews</p>
                    </div>
                    {descriptionVisible && (
                        <div className='w-full mx-20 my-5 flex flex-col gap-5 items-center'>
                            <p className='w-full'>{product.description}</p>
                            <Image src="/images/product1.png" alt="Product Image" width={500} height={500} className="object-contain h-full" />
                        </div>
                    )}
                    {reviewsVisible && (
                        <div className='w-full px-20 my-5 flex flex-col gap-5 items-center'>
                            <p className='w-full text-lg font-semibold'>Reviews</p>
                            {
                                product.reviews.map((review) => (
                                    <ReviewItem key={review.id} review={review} />
                                ))}
                        </div>
                    )}
                </div>
                <div className="mx-20 mb-5 border-b border-gray-300">
                    <div className="flex items-center py-5">
                        <div className="bg-[#FF8200] w-5 h-10 rounded-sm"></div>
                        <div className="text-[#ff8200] ml-5 font-[600] text-xl">Related Item</div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10 w-full h-auto mx-auto justify-items-center" >
                        <ProductCard product={{ id: "pro001", name: "Product 1", image: "/images/product1.png", price: 166, rating: 4, discount: 40 }} />
                        <ProductCard product={{ id: "pro002", name: "Product 2", image: "/images/product1.png", price: 200, rating: 5, discount: 30 }} />
                        <ProductCard product={{ id: "pro003", name: "Product 3", image: "/images/product1.png", price: 120, rating: 3, discount: 20 }} />
                        <ProductCard product={{ id: "pro004", name: "Product 4", image: "/images/product1.png", price: 180, rating: 4, discount: 50 }} />
                        <ProductCard product={{ id: "pro005", name: "Product 5", image: "/images/product1.png", price: 150, rating: 4, discount: 10 }} />
                    </div>
                </div>
            </div>

        </div>
    )
}
