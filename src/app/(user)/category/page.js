"use client"
import React, { useState, useEffect } from 'react'
import { ProductCard } from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { getAllProducts } from '@/api/productApi';
import { getAllCategories } from '@/api/categoryApi';

export default function ProductByCategoryPage() {
    const searchParams = useSearchParams();
    const categoryID = searchParams.get('id');
    const [category, setCategory] = useState('')
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getAllProducts();
            console.log(response);
            if (response) {
                const filtered = response.filter(product => {
                    if (product.category && typeof product.category === "object" && product.category.id) {
                        return String(product.category.id) === String(categoryID);
                    }
                    return String(product.category) === String(categoryID);
                });
                setProducts(filtered);
            }
        };
        const fetchCategory = async () => {
            const response = await getAllCategories();
            const categories = response?.data?.content || response?.data || response;
            if (Array.isArray(categories)) {
                const found = categories.find(cat => String(cat.id) === String(categoryID));
                setCategory(found ? found.name : '');
            } else {
                setCategory('');
            }
        }
        const fetchData = async () => {
            await fetchCategory();
            await new Promise(resolve => setTimeout(resolve, 1000));
            await fetchProducts();
        }
        fetchData();
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
                {products.length === 0 && (
                    <div className='text-center text-gray-500 mt-10'>
                        No products found in this category.
                    </div>
                )}
            </div>
        </div>
    )
}
