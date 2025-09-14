"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import OrderItem from "@/components/OrderItem";
import { getAllOrders } from "@/api/orderApi";

export default function CancellationOrderPage() {
  const [order, setOrder] = useState([
    // { id: "1", total: 123, state: "Cancelled" },
  ]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = Cookies.get("user"); // Lấy thông tin người dùng từ cookie

        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Nếu có dữ liệu, cập nhật state `user`
        }

        const userId = JSON.parse(localStorage.getItem("user_profile"))?.id;
        if (!userId) {
          console.warn("No user profile found in localStorage");
          return;
        }

        const orders = await getAllOrders(userId);

        // Chỉ lấy các đơn hàng có trạng thái là "cancelled"
        const orderFormat = orders
          .filter((ord) => ord.status === "cancelled")
          .map((ord) => ({
            id: ord.id,
            total: ord.totalPrice,
            state: "cancelled",
          }));

        console.log("Fetched cancelled orders:", orderFormat);

        setOrder(orderFormat);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <div className="flex justify-between mr-20 mt-10 ">
        <div id="roadmap" className="flex items-center ml-15">
          <a className="text-gray-500" href="/">
            Home
          </a>
          <label className="ml-3 mr-3">/</label>
          <a className="text-gray-500" href="/order">
            My Orders
          </a>
          <label className="ml-3 mr-3">/</label>
          <a className="text-black" href="/cancellation">
            My Cancellations
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
            <a href="/cancellation" className="text-[#ff8200]">
              My Cancellations
            </a>
          </div>
          <a href="/wishlist">My WishList</a>
          <a href="/promotion">My Promotions</a>
        </div>
        <div className="w-full bg-white pb-10">
          <p className="text-[#ff8200] text-xl mt-10 w-4/5 mx-auto">
            My Cancellations
          </p>

          <table className="w-full mt-5 border-separate border-spacing-y-5">
            <thead>
              <tr className="bg-[#efefef] shadow-md rounded-md">
                <th className="font-medium py-3">ID</th>
                <th className="font-medium">Total</th>
                <th className="font-medium">State</th>
                <th className="font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="w-full text-center">
              {order.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
