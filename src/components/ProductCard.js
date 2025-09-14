import React, { useState } from "react";
import Image from "next/image";
import { getLinkImage } from "@/api/splitService";
import { addToCart } from "@/api/cartApi";
import { addToFavorites } from "@/api/wishlist";

export const ProductCard = ({ product }) => {
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const handleAddToCart = async (e) => {
    const id = JSON.parse(localStorage.getItem("user_profile")).id;
    e.stopPropagation();
    e.preventDefault();
    const data = {
      quantity: 1,
      productId: product.id,
      userId: id,
    };
    await addToCart(data);
  };

  // const currentPrice = product.price;
  const currentPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

  const handleMouseEnter = () => {
    setShowAddToCart(true);
  };

  const handleMouseLeave = () => {
    setShowAddToCart(false);
  };

  const handleClickOnAddToWishlist = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const userId = JSON.parse(localStorage.getItem("user_profile")).id;
    const favoriteData = {
      userId: userId,
      productId: product.id,
    };
    await addToFavorites(favoriteData);
  };

  return (
    <div
      className="min-w-[240px] bg-white w-[18%] p-4 rounded-2xl shadow-md hover:shadow-xl 
             transition-all duration-300 ease-in-out cursor-pointer flex flex-col justify-between h-[380px] relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => (window.location.href = `/product?id=${product.id}`)}
    >
      {/* Badge giảm giá */}
      {product.discount > 0 && (
        <div className="absolute top-4 left-4 bg-[#FF3D00] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          -{product.discount}%
        </div>
      )}

      {/* Wishlist icon */}
      <div className="absolute top-4 right-4 bg-white border border-gray-200 p-2 rounded-full shadow-sm hover:bg-[#FF8200] hover:text-white transition-colors">
        <Image
          src={"/icons/blwishlistic.png"}
          alt={"wish"}
          width={22}
          height={22}
          onClick={handleClickOnAddToWishlist}
          className="cursor-pointer"
        />
      </div>

      {/* Product image */}
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={
            product && product.imageUrl
              ? getLinkImage(product.imageUrl)
              : "/images/placeholder.png"
          }
          alt={"Product"}
          width={220}
          height={220}
          className="object-contain max-h-[220px]"
        />
      </div>

      {/* Hover Add To Cart button */}
      {showAddToCart && (
        <button
          className="absolute bottom-3 right-3 
               bg-[#FF8200] text-white w-10 h-10 rounded-full 
               shadow-md hover:bg-[#e56f00] transition-all duration-300 
               flex items-center justify-center"
          onClick={handleAddToCart}
        >
          🛒
        </button>
      )}

      {/* Product info */}
      <div className="mt-3 flex flex-col gap-2">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 h-[48px]">
          {product.name}
        </h3>
        <div className="flex flex-col gap-1">
          <p className="text-[#FF8200] text-xl font-bold">
            {Number(currentPrice).toLocaleString()} $
          </p>
          {product.discount > 0 && (
            <p className="text-gray-400 text-sm line-through">
              {Number(product.price).toLocaleString()} $
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
