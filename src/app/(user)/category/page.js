"use client"
import React, { useState } from 'react'
import { ProductCard } from '@/components/ProductCard';

export default function ProductByCategoryPage(idCategory) {
    const category = "Rackets"; // Lấy category từ URL
    const [products, setProducts] = useState([
        { id: "pro001", name: "Product 1", image: "/images/product1.png", price: 166, rating: 4, discount: 40 },
        { id: "pro002", name: "Product 2", image: "/images/product1.png", price: 200, rating: 5, discount: 20 },
        { id: "pro003", name: "Product 3", image: "/images/product1.png", price: 300, rating: 3, discount: 10 },
        { id: "pro004", name: "Product 4", image: "/images/product1.png", price: 400, rating: 2, discount: 0 }
    ])
    return (
        <div>
            <div id="roadmap" className="flex items-center mt-10 ml-15">
                <a className="text-gray-500" href="/">Home</a>
                <label className="ml-3 mr-3">/</label>
                <a className="text-black" href="/category?rackets">{category}</a>
            </div>
            <div className='mx-30 mt-10'>
                <div className='flex flex-col gap-5 '>
                    <div className='grid grid-cols-5 gap-5'>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
