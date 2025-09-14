"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PromotionItem from "@/components/PromotionItem";
import { getAllPromotions } from "@/api/promotionApi";

export default function PromotionPage() {
  const [promotion, setPromotion] = useState([
    {
      id: "1",
      discount: 10,
      start: "2025-04-20",
      end: "2025-05-20",
      code: "ABC123",
      name: "Promotion 1",
    },
  ]); // Khởi tạo state cho danh sách phiếu giảm giá
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const storedUser = Cookies.get("user"); // lấy user từ cookie
        const promotions = await getAllPromotions(); // gọi API lấy promotions

        if (storedUser) {
          setUser(JSON.parse(storedUser)); // parse JSON thay vì set raw string
        }

        console.log("Fetched promotions:", promotions);

        if (promotions && Array.isArray(promotions)) {
          const formatPromotions = promotions.map((promo) => ({
            id: promo.id,
            discount: promo.percent,
            start: new Date(promo.startTime).toLocaleDateString("en-CA"),
            end: new Date(promo.endTime).toLocaleDateString("en-CA"),
            code: promo.code,
            name: promo.description,
          }));

          setPromotion(formatPromotions);
        }
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <div>
      <div className="flex justify-between mr-20 mt-10 ">
        <div id="roadmap" className="flex items-center ml-15">
          <a className="text-gray-500" href="/">
            Home
          </a>
          <label className="ml-3 mr-3">/</label>
          <a className="text-black" href="/order">
            My Orders
          </a>
        </div>
        <div>
          Welcome!{" "}
          <span className="text-[#ff8200]">
            {user ? `${user.username} !` : ""}
          </span>
        </div>
      </div>
      <div className="mx-20 grid grid-cols-[20%_1fr] gap-5 mt-10">
        <div className="flex flex-col gap-3 font-medium">
          <a href="/account">Manage My Account</a>
          <div className="text-gray-500 font-normal ml-3 flex flex-col gap-2">
            <a href="/account">My Profile</a>
            <a href="address">Address Book</a>
          </div>
          <a href="/order">My Orders</a>
          <div className="text-gray-500 font-normal ml-3 flex flex-col gap-2">
            <a href="/completion">My Completions</a>
            <a href="/cancellation">My Cancellations</a>
          </div>
          <a href="/wishlist">My WishList</a>
          <a href="/promotion" className="text-[#ff8200]">
            My Promotions
          </a>
        </div>
        <div className="w-full bg-white pb-10">
          <p className="text-[#ff8200] text-xl mt-10 w-4/5 mx-auto">
            My Promotions
          </p>

          <div className="w-4/5 mx-auto mt-5 grid grid-cols-3 gap-5">
            {promotion.map((promo) => (
              <PromotionItem key={promo.id} promo={promo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
