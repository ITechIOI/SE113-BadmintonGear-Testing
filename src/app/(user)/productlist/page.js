"use client";
import React, { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/api/productApi";
import { getAllCategories } from "@/api/categoryApi";
import "../../../styles/globals.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999);
  const [brands, setBrands] = useState([]);
  const [notFoundByImage, setNotFoundByImage] = useState(false);

  const [showMaxPrice, setShowMaxPrice] = useState(false);
  const [showMinPrice, setShowMinPrice] = useState(false);

  // 🔹 State cho filter
  const [availabilityFilter, setAvailabilityFilter] = useState([]); // ["inStock", "outOfStock"]
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);

  const fetchProducts = async () => {
    const response = await getAllProducts();
    if (response && response.length > 0) {
      setProducts(response);

      // Tìm giá trị max trong danh sách sản phẩm
      const maxProductPrice = Math.max(...response.map((p) => p.price));
      setShowMaxPrice(maxProductPrice);

      // Tìm giá trị min trong danh sách sản phẩm
      const minProductPrice = Math.min(...response.map((p) => p.price));
      setShowMinPrice(minProductPrice);

      setDisplayedProducts(response);
      const uniqueBrands = Array.from(
        new Set(response.map((product) => product.brand).filter(Boolean))
      );
      setBrands(uniqueBrands);
    }
  };

  const fetchCategories = async () => {
    const response = await getAllCategories();
    if (response.data.content && response.data.content.length > 0) {
      setCategories(response.data.content);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await fetchCategories();
    };
    fetchData();
  }, []);

  // 🔹 Filter logic
  useEffect(() => {
    let filtered = [...products];

    // Lọc theo availability
    if (availabilityFilter.length > 0) {
      filtered = filtered.filter((p) => {
        if (availabilityFilter.includes("inStock") && p.stock > 0) return true;
        if (availabilityFilter.includes("outOfStock") && p.stock === 0)
          return true;
        return false;
      });
    }

    // Lọc theo category
    if (categoryFilter.length > 0) {
      filtered = filtered.filter((p) => {
        return categoryFilter.includes(p.category.name);
      });
    }

    // Lọc theo brand
    if (brandFilter.length > 0) {
      filtered = filtered.filter((p) => brandFilter.includes(p.brand));
    }

    // Lọc theo price range
    filtered = filtered.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    setDisplayedProducts(filtered);
  }, [
    availabilityFilter,
    categoryFilter,
    brandFilter,
    minPrice,
    maxPrice,
    products,
  ]);

  return (
    <div className="max-w-[1800px] mx-auto">
      <div
        className="flex justify-between"
        style={{ minHeight: "calc(100vh - 80px)", overflow: "hidden" }}
      >
        {/* Sidebar Filter */}
        <div className="ml-20 w-[220px] h-full">
          <div id="roadmap" className="flex items-center mb-20 mt-10">
            <a className="text-gray-500" href="/">
              Home
            </a>
            <label className="ml-3 mr-3">/</label>
            <a className="text-black" href="/productlist">
              Product
            </a>
          </div>

          <h2 className="font-bold text-2xl">Filter</h2>

          {/* Category */}
          <div className="py-3 border-t border-dashed border-gray-300">
            <div className="text-xl mb-3">Category</div>
            <div>
              {categories.map((cat) => (
                <label key={cat.id} className="block">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={categoryFilter.includes(cat.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategoryFilter([...categoryFilter, cat.name]);
                      } else {
                        setCategoryFilter(
                          categoryFilter.filter((c) => c !== cat.name)
                        );
                      }
                    }}
                  />{" "}
                  {cat.name}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="py-3 border-t border-dashed border-gray-300">
            <div className="text-xl mb-3">Price Range</div>
            <div>
              <div>
                <label>Min: {minPrice}</label>
                <input
                  type="range"
                  min={showMinPrice}
                  max={showMaxPrice}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label>Max: {maxPrice}</label>
                <input
                  type="range"
                  min={showMinPrice}
                  max={showMaxPrice}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="py-3 border-t border-dashed border-gray-300">
            <div className="text-xl mb-3">Brands</div>
            <div>
              {brands.map((brand) => (
                <label key={brand} className="block">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={brandFilter.includes(brand)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setBrandFilter([...brandFilter, brand]);
                      } else {
                        setBrandFilter(brandFilter.filter((b) => b !== brand));
                      }
                    }}
                  />{" "}
                  {brand}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div
          id="product-list-scroll"
          className="flex-1 mx-10 mt-10 hide-scrollbar"
          style={{ minHeight: "100%", overflowY: "auto" }}
        >
          <div className="flex flex-col gap-5">
            {notFoundByImage && (
              <div className="text-center py-4 text-red-500 font-semibold">
                Not found products by image. Please try again.
              </div>
            )}
            <div className="grid grid-cols-4 gap-5">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {displayedProducts.length === 0 && (
              <div className="text-center py-4">No products found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
