"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import OrderItem from "@/components/OrderItem";
import { getOrderByUserId } from "@/api/orderApi";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  // pagination
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userProfile = localStorage.getItem("user_profile");
        if (!userProfile) {
          console.warn("No user_profile found in localStorage");
          return;
        }

        const userId = JSON.parse(userProfile).id;
        const ordersData = await getOrderByUserId(userId, page, limit);

        if (ordersData && ordersData.content) {
          const orderFormat = ordersData.content.map((ord) => ({
            id: ord.id,
            total: ord.totalPrice,
            state: ord.status,
          }));
          setOrders(orderFormat);
          setTotalPages(ordersData.totalPages);
        }

        const storedUser = Cookies.get("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [page, limit]);

  return (
    <div>
      {/* breadcrumb + user */}
      <div className="flex justify-between mr-20 mt-10">
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

      {/* layout */}
      <div className="mx-20 grid grid-cols-[20%_1fr] gap-5 mt-10">
        {/* sidebar */}
        <div className="flex flex-col gap-3 font-medium">
          <a href="/account">Manage My Account</a>
          <div className="text-gray-500 font-normal ml-3 flex flex-col gap-2">
            <a href="/account">My Profile</a>
            <a href="/address">Address Book</a>
          </div>
          <a href="/order" className="text-[#ff8200]">
            My Orders
          </a>
          <div className="text-gray-500 font-normal ml-3 flex flex-col gap-2">
            <a href="/completion">My Completions</a>
            <a href="/cancellation">My Cancellations</a>
          </div>
          <a href="/wishlist">My WishList</a>
          <a href="/promotion">My Promotions</a>
        </div>

        {/* main content */}
        <div className="w-full bg-white pb-10">
          <p className="text-[#ff8200] text-xl mt-10 w-4/5 mx-auto">
            My Orders
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
              {orders.length > 0 ? (
                orders.map((item) => <OrderItem key={item.id} item={item} />)
              ) : (
                <tr>
                  <td colSpan="4" className="py-5 text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* pagination controls */}
          <div className="flex justify-between items-center mt-5 px-10">
            {/* left: tổng số trang */}
            <div className="text-gray-600 text-sm">
              Page <span className="font-semibold">{page + 1}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </div>

            {/* middle: pagination numbers */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="px-3 py-1 rounded border text-sm hover:bg-gray-100 disabled:opacity-50"
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`px-3 py-1 rounded text-sm border ${
                    page === i
                      ? "bg-[#ff8200] text-white border-[#ff8200]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1 rounded border text-sm hover:bg-gray-100 disabled:opacity-50"
              >
                →
              </button>
            </div>

            {/* right: rows per page */}
            <div className="flex items-center gap-2 text-sm">
              <label>Rows:</label>
              <select
                value={limit}
                onChange={(e) => {
                  setPage(0);
                  setLimit(Number(e.target.value));
                }}
                className="border rounded px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
