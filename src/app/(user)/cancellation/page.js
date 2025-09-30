"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import OrderItem from "@/components/OrderItem";
import { getOrderByUserId } from "@/api/orderApi";

export default function CancellationOrderPage() {
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = Cookies.get("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        const userId = JSON.parse(localStorage.getItem("user_profile"))?.id;
        if (!userId) return;

        const result = await getOrderByUserId(
          userId,
          currentPage - 1,
          rowsPerPage
        );

        if (result && result.content) {
          const allOrders = result.content;
          const cancelledOrders = allOrders.filter(
            (ord) => ord.status?.toLowerCase() === "cancelled"
          );

          const orderFormat = cancelledOrders.map((ord) => ({
            id: ord.id,
            total: ord.totalPrice,
            state: "cancelled",
          }));

          setOrder(orderFormat);

          // ⚠️ Tính lại số trang dựa trên cancelledOrders
          const totalCancelled = cancelledOrders.length;
          setTotalPages(Math.ceil(totalCancelled / rowsPerPage) || 1);
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
