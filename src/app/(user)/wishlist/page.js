"use client";
import { ProductCard } from "@/components/ProductCard";
import React, { useEffect, useState } from "react";
import {
  getAllFavorites,
  removeFromFavorites,
  addToFavorites,
} from "@/api/wishlist";
import { getProductById } from "@/api/productApi";

export default function WishList() {
  const [favorites, setFavorites] = useState([]);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await getAllFavorites(
        JSON.parse(localStorage.getItem("user_profile")).id
      );

      if (response) {
        // Lấy chi tiết từng product từ productId
        const detailedFavorites = await Promise.all(
          response.map(async (fav) => {
            const product = await getProductById(fav.productId);
            return { ...fav, product };
          })
        );
        setNumber(detailedFavorites.length);
        setFavorites(detailedFavorites);
      } else {
        setFavorites([]);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div>
      {/* Breadcrumb */}
      <div id="roadmap" className="flex items-center mt-10 ml-15 text-sm">
        <a className="text-gray-500 hover:text-[#FF8200] transition" href="/">
          Home
        </a>
        <label className="mx-2 text-gray-400">/</label>
        <a className="text-black font-medium" href="/wishlist">
          Wishlist
        </a>
      </div>

      {/* Header */}
      <div className="w-full flex justify-between items-center px-20 pt-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
          Wishlist <span className="text-[#FF8200]">({number})</span>
        </h2>
        <button
          className="bg-[#FF8200] text-white text-base font-semibold px-8 py-3 rounded-lg shadow-md 
                 hover:bg-[#e56f00] hover:shadow-lg transform hover:-translate-y-0.5 
                 transition-all duration-300 ease-in-out cursor-pointer"
        >
          Add All To Cart
        </button>
      </div>

      {/* Wishlist Section */}
      <div className="mx-20 my-10 border-t border-gray-200 pt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          {favorites.length > 0 ? (
            favorites.map((fav) => (
              <ProductCard key={fav.productId} product={fav.product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-10 text-lg">
              Your wishlist is empty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
