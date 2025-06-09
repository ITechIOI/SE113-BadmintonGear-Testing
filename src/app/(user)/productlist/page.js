"use client"
import React, { useState, useEffect } from 'react'
import { ProductCard } from '@/components/ProductCard';
import { getAllProducts } from '@/api/productApi';
import { getAllCategories } from '@/api/categoryApi';
import "../../../styles/globals.css"

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(999);
    const [brands, setBrands] = useState([]);
    const [notFoundByImage, setNotFoundByImage] = useState(false);

    const fetchProducts = async () => {
        const response = await getAllProducts();
        if (response && response.length > 0) {
            setProducts(response);
            setDisplayedProducts(response);
            const uniqueBrands = Array.from(new Set(response.map(product => product.brand).filter(Boolean)));
            setBrands(uniqueBrands);
        }
    };
    const fetchCategories = async () => {
        const response = await getAllCategories();
        if (response.data.content && response.data.content.length > 0) {
            setCategories(response.data.content);
        }
    }

    // Fetch toàn bộ sản phẩm một lần
    useEffect(() => {
        const fetchData = async () => {
            await fetchProducts();
            await new Promise(resolve => setTimeout(resolve, 1000));
            await fetchCategories();
        }
        fetchData();
    }, []);

    // Lọc sản phẩm theo productByImage mỗi khi products thay đổi
    useEffect(() => {
        const productByImage = localStorage.getItem('productByImage');
        console.log("productByImage from localStorage:", productByImage);
        if (productByImage && products.length > 0) {
            const parsedProducts = JSON.parse(productByImage);
            console.log("Parsed products from localStorage:", parsedProducts);
            const filteredProducts = products.filter(p =>
                parsedProducts.some(pp => String(pp.id) === String(p.id))
            );
            if (filteredProducts.length > 0) {
                setDisplayedProducts(filteredProducts);
                localStorage.removeItem('productByImage');
                setNotFoundByImage(false);
                const uniqueBrands = Array.from(new Set(filteredProducts.map(p => p.brand).filter(Boolean)));
                setBrands(uniqueBrands);
            } else {
                setDisplayedProducts(products);
                setNotFoundByImage(true);
                const uniqueBrands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));
                setBrands(uniqueBrands);
            }
        } else {
            setDisplayedProducts(products);
            setNotFoundByImage(false);
            const uniqueBrands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));
            setBrands(uniqueBrands);
        }
    }, [products]);

    // Lắng nghe sự kiện storage để cập nhật khi productByImage thay đổi ở bất kỳ nơi nào
    useEffect(() => {
        const handleStorage = (event) => {
            if (event.key === 'productByImage') {
                const productByImage = localStorage.getItem('productByImage');
                if (productByImage && products.length > 0) {
                    const parsedProducts = JSON.parse(productByImage);
                    const filteredProducts = products.filter(p =>
                        parsedProducts.some(pp => String(pp.id) === String(p.id))
                    );
                    if (filteredProducts.length > 0) {
                        setDisplayedProducts(filteredProducts);
                        localStorage.removeItem('productByImage');
                        setNotFoundByImage(false);
                        const uniqueBrands = Array.from(new Set(filteredProducts.map(p => p.brand).filter(Boolean)));
                        setBrands(uniqueBrands);
                    } else {
                        setDisplayedProducts(products);
                        setNotFoundByImage(true);
                        const uniqueBrands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));
                        setBrands(uniqueBrands);
                    }
                } else {
                    setDisplayedProducts(products);
                    setNotFoundByImage(false);
                    const uniqueBrands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));
                    setBrands(uniqueBrands);
                }
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [products]);

    return (
        <div className='max-w-[1800px] mx-auto'>
            <div
                className='flex justify-between'
                style={{ minHeight: "calc(100vh - 80px)", overflow: "hidden" }}
            >
                <div className="ml-20 w-[220px] h-full">
                    <div id="roadmap" className="flex items-center mb-20 mt-10">
                        <a className="text-gray-500" href="/">Home</a>
                        <label className="ml-3 mr-3">/</label>
                        <a className="text-black" href="/productlist">Product</a>
                    </div>
                    <h2 className='font-bold text-2xl'>Filter</h2>
                    <div className="py-3 border-t border-dashed border-gray-300">
                        <div className="flex text-xl mb-3">Availability</div>
                        <div>
                            <label className="block">
                                <input type="checkbox" className="mr-2" /> Availability
                            </label>
                            <label className="block">
                                <input type="checkbox" className="mr-2" /> Out of Stock
                            </label>
                        </div>
                    </div>
                    <div className="py-3 border-t border-dashed border-gray-300">
                        <div className='text-xl mb-3'>Category</div>
                        <div >
                            {categories.map((cat) => (
                                <label key={cat.id} className="block">
                                    <input type="checkbox" className="mr-2" /> {cat.name}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="py-3 border-t border-dashed border-gray-300">
                        <div className='text-xl mb-3'>Price Range</div>
                        <div>
                            <div>
                                <label>Min</label>
                                <input type="range"
                                    min={0} max={999}
                                    value={minPrice}
                                    onChange={(e) => { setMinPrice(e.target.value) }} />
                            </div>
                            <div>
                                <label>Max</label>
                                <input
                                    type="range"
                                    min={0}
                                    max={999}
                                    value={maxPrice}
                                    onChange={(e) => { setMaxPrice(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="py-3 border-t border-dashed border-gray-300">
                        <div className='text-xl mb-3'>Brands</div>
                        <div>
                            {brands.map((brand) => (
                                <label key={brand} className="block">
                                    <input type="checkbox" className="mr-2" /> {brand}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Danh sách sản phẩm */}
                <div
                    id="product-list-scroll"
                    className='flex-1 mx-10 mt-10 hide-scrollbar'
                    style={{ minHeight: "100%", overflowY: "auto" }}
                >
                    <div className='flex flex-col gap-5'>
                        {notFoundByImage && (
                            <div className="text-center py-4 text-red-500 font-semibold">
                                Not found products by image. Please try again.
                            </div>
                        )}
                        <div className='grid grid-cols-4 gap-5'>
                            {displayedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        {displayedProducts.length === 0 && <div className="text-center py-4">No products found</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}