"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import OrderItem from "@/components/OrderItem";
import { getOrderByUserId } from "@/api/orderApi";

export default function CompletionOrderPage() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = Cookies.get("user");
        if (storedUser) setUser(JSON.parse(storedUser));

        const userProfile = localStorage.getItem("user_profile");
        if (!userProfile) return;

        const userId = JSON.parse(userProfile).id;
        const result = await getOrderByUserId(
          userId,
          currentPage - 1, // API thường 0-based
          rowsPerPage
        );

        if (result && result.content) {
          // lọc các đơn hàng completed
          const completedOrders = result.content.filter(
            (ord) => ord.status?.toLowerCase() === "completed"
          );

          const orderFormat = completedOrders.map((ord) => ({
            id: ord.id,
            total: ord.totalPrice,
            state: "completed",
          }));

          setOrders(orderFormat);

          // tính lại số trang dựa trên completedOrders
          const totalCompleted =
            result.totalElements && result.content.length > 0
              ? completedOrders.length
              : 0;
          setTotalPages(Math.ceil(totalCompleted / rowsPerPage) || 1);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [currentPage, rowsPerPage]);

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
          <a className="text-black" href="/completion">
            My Completions
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
            <a href="/completion" className="text-[#ff8200]">
              My Completions
            </a>
            <a href="/cancellation">My Cancellations</a>
          </div>
          <a href="/wishlist">My WishList</a>
          <a href="/promotion">My Promotions</a>
        </div>

        <div className="w-full bg-white pb-10">
          <p className="text-[#ff8200] text-xl mt-10 w-4/5 mx-auto">
            My Completions
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
              {orders.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-5 px-6 py-4 bg-[#F9FAFB]">
            <div className="text-gray-600 text-sm">
              Page <span className="font-semibold">{currentPage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </div>

            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border text-sm hover:bg-gray-100 disabled:opacity-50"
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded text-sm border ${
                    currentPage === i + 1
                      ? "bg-[#ff8200] text-white border-[#ff8200]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border text-sm hover:bg-gray-100 disabled:opacity-50"
              >
                →
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Rows:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
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
