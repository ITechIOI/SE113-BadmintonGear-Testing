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
      <div id="roadmap" className="flex items-center mt-10 ml-15">
        <a className="text-gray-500" href="/">
          Home
        </a>
        <label className="ml-3 mr-3">/</label>
        <a className="text-black" href="/wishlist">
          Wishlist
        </a>
      </div>
      <div className="w-full flex justify-between px-20 items-center pt-5 font-medium">
        <p className="text-xl">Wishlist ({number})</p>
        <button className="border rounded-xs px-10 py-3 hover:bg-[#FF8200] hover:text-white transition-all duration-300 ease-in-out">
          Move All To Cart
        </button>
      </div>
      <div className="mx-20 mb-5 border-b border-gray-300">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 w-full h-auto mx-auto justify-items-center">
          {favorites.length > 0 ? (
            favorites.map((fav) => (
              <ProductCard key={fav.productId} product={fav.product} />
            ))
          ) : (
            <p className="text-gray-500">Your wishlist is empty.</p>
          )}
        </div>
      </div>
      {/* <div className="mx-20 mb-5 border-b border-gray-300">
        <div className="flex items-center py-5">
          <div className="bg-[#FF8200] w-5 h-10 rounded-sm"></div>
          <div className="text-[#ff8200] ml-5 font-[600] text-xl">
            Just For You
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 w-full h-auto mx-auto justify-items-center">
          <ProductCard
            product={{
              id: "pro001",
              name: "Product 1",
              image: "/images/product1.png",
              price: 166,
              rating: 4,
              discount: 40,
            }}
          />
          <ProductCard
            product={{
              id: "pro002",
              name: "Product 2",
              image: "/images/product1.png",
              price: 200,
              rating: 5,
              discount: 30,
            }}
          />
          <ProductCard
            product={{
              id: "pro003",
              name: "Product 3",
              image: "/images/product1.png",
              price: 120,
              rating: 3,
              discount: 20,
            }}
          />
          <ProductCard
            product={{
              id: "pro004",
              name: "Product 4",
              image: "/images/product1.png",
              price: 180,
              rating: 4,
              discount: 50,
            }}
          />
          <ProductCard
            product={{
              id: "pro005",
              name: "Product 5",
              image: "/images/product1.png",
              price: 150,
              rating: 4,
              discount: 10,
            }}
          />
        </div>
      </div> */}
    </div>
  );
}
