"use client"
import { ProductCard } from '@/components/ProductCard';

export default function WishList() {
    const number = 7;
    return (
        <div>
            <div className='w-full flex justify-between px-20 items-center pt-10 font-medium'>
                <p className='text-xl'>Wishlist ({number})</p>
                <button className='border rounded-xs px-10 py-3 hover:bg-[#FF8200] hover:text-white transition-all duration-300 ease-in-out'>Move All To Cart</button>
            </div>
            <div className="mx-20 mb-5 border-b border-gray-300">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 w-full h-auto mx-auto justify-items-center" >
                    <ProductCard product={{ id: "pro001", name: "Product 1", image: "/images/product1.png", price: 166, rating: 4, discount: 40 }} />
                    <ProductCard product={{ id: "pro002", name: "Product 2", image: "/images/product1.png", price: 200, rating: 5, discount: 30 }} />
                    <ProductCard product={{ id: "pro003", name: "Product 3", image: "/images/product1.png", price: 120, rating: 3, discount: 20 }} />
                    <ProductCard product={{ id: "pro004", name: "Product 4", image: "/images/product1.png", price: 180, rating: 4, discount: 50 }} />
                    <ProductCard product={{ id: "pro005", name: "Product 5", image: "/images/product1.png", price: 150, rating: 4, discount: 10 }} />
                    <ProductCard product={{ id: "pro006", name: "Product 6", image: "/images/product1.png", price: 150, rating: 4, discount: 10 }} />
                    <ProductCard product={{ id: "pro007", name: "Product 7", image: "/images/product1.png", price: 150, rating: 4, discount: 10 }} />
                </div>
            </div>
            <div className="mx-20 mb-5 border-b border-gray-300">
                <div className="flex justify-between items-center py-5">
                    <div className="flex items-center py-5">
                        <div className="bg-[#FF8200] w-5 h-10 rounded-sm"></div>
                        <div className="text-[#ff8200] ml-5 font-[600] text-xl">Just For You</div>
                    </div>
                    <button className='border rounded-xs px-10 py-3 hover:bg-[#FF8200] hover:text-white transition-all duration-300 ease-in-out'>
                        See All
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 w-full h-auto mx-auto justify-items-center" >
                    <ProductCard product={{ id: "pro001", name: "Product 1", image: "/images/product1.png", price: 166, rating: 4, discount: 40 }} />
                    <ProductCard product={{ id: "pro002", name: "Product 2", image: "/images/product1.png", price: 200, rating: 5, discount: 30 }} />
                    <ProductCard product={{ id: "pro003", name: "Product 3", image: "/images/product1.png", price: 120, rating: 3, discount: 20 }} />
                    <ProductCard product={{ id: "pro004", name: "Product 4", image: "/images/product1.png", price: 180, rating: 4, discount: 50 }} />
                    <ProductCard product={{ id: "pro005", name: "Product 5", image: "/images/product1.png", price: 150, rating: 4, discount: 10 }} />
                </div>
            </div>
        </div>
    )
}
