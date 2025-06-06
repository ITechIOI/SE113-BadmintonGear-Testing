"use client"
import React, { useState, useEffect } from 'react'
import { ProductCard } from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { getAllProducts } from '@/api/productApi';

export default function ProductByCategoryPage() {
    const searchParams = useSearchParams();
    const categoryID = searchParams.get('id');
    const [category, setCategory] = useState('')
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getAllProducts();
            const filtered = response.filter(product => {
                if (product.category && typeof product.category === "object" && product.category.id) {
                    return String(product.category.id) === String(categoryID);
                }
                return String(product.category) === String(categoryID);
            });
            setProducts(filtered);

            if (filtered.length > 0) {
                if (filtered[0].category && typeof filtered[0].category === "object" && filtered[0].category.name) {
                    setCategory(filtered[0].category.name);
                } else {
                    setCategory(filtered[0].category);
                }
            } else {
                setCategory(categoryID);
            }
        };
        fetchProducts();
    }, [categoryID]);


    return (
        <div className='max-w-[1800px] mx-auto'>
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
