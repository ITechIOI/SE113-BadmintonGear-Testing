"use client";
import { useState, useEffect, use } from "react";
import React from "react";
import AdminOrderItem from "@/components/AdminOrderItem";
import { getAllOrders } from "@/api/orderApi";

export default function OrderPage() {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all-times");
  const [orders, setOrders] = useState([]);
  const [orderDisplay, setOrderDisplay] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // pagination state
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (page, limit) => {
    try {
      const result = await getAllOrders(page, limit);
      if (result) {
        setOrders(result.content); // list đơn hàng của 1 page
        setTotalPages(result.totalPages); // số trang từ backend
      } else {
        console.log("No data returned");
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(page, limit);
  }, [page, limit]);

  const filterOrdersByDate = () => {
    if (startDate) {
      let filteredOrders = [];
      const endDateObj = endDate
        ? new Date(new Date(endDate).setHours(23, 59, 59, 999))
        : null;
      if (!endDate) {
        filteredOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= new Date(startDate);
        });
      } else {
        filteredOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= new Date(startDate) && orderDate <= endDateObj;
        });
      }
      setOrderDisplay(filteredOrders);
      setPage(0);
    } else {
      if (endDate) {
        const endDateObj = new Date(
          new Date(endDate).setHours(23, 59, 59, 999)
        );
        const filteredOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate <= endDateObj;
        });
        setOrderDisplay(filteredOrders);
      } else {
        setOrderDisplay(orders);
      }
      setPage(0);
    }
  };

  const handleRadioChange = (option) => {
    let filtered = [];
    switch (option) {
      case "all-times":
        filtered = orders;
        break;
      case "12-months":
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);
        filtered = orders.filter(
          (order) => new Date(order.createdAt) >= twelveMonthsAgo
        );
        break;
      case "30-days":
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        filtered = orders.filter(
          (order) => new Date(order.createdAt) >= thirtyDaysAgo
        );
        break;
      case "7-days":
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        filtered = orders.filter(
          (order) => new Date(order.createdAt) >= sevenDaysAgo
        );
        break;
      case "24-hours":
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        filtered = orders.filter(
          (order) => new Date(order.createdAt) >= twentyFourHoursAgo
        );
        break;
      default:
        filtered = orders;
    }
    setOrderDisplay(filtered);
    setSelectedOption(option);
    setPage(0);
  };

  // pagination calculations
  return (
    <div className="font-inter">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <div id="roadmap" className="flex items-center mt-2">
            <a className="text-[#ff8200]" href="/admin/dashboard">
              Dashboard
            </a>
            <label className="ml-3 mr-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.59467 3.96967C6.30178 4.26256 6.30178 4.73744 6.59467 5.03033L10.5643 9L6.59467 12.9697C6.30178 13.2626 6.30178 13.7374 6.59467 14.0303C6.88756 14.3232 7.36244 14.3232 7.65533 14.0303L12.4205 9.26516C12.5669 9.11872 12.5669 8.88128 12.4205 8.73484L7.65533 3.96967C7.36244 3.67678 6.88756 3.67678 6.59467 3.96967Z"
                  fill="#A3A9B6"
                />
              </svg>
            </label>
            <a className="text-[#667085]" href="/admin/order">
              Order List
            </a>
          </div>
        </div>
        <button className="bg-[#FBE3CA] text-[#FF8200] rounded-md px-4 py-2 flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.0891 6.00582C12.7637 6.33126 12.236 6.33126 11.9106 6.00582L10.8332 4.92841V12.9166C10.8332 13.3768 10.4601 13.7499 9.99984 13.7499C9.5396 13.7499 9.1665 13.3768 9.1665 12.9166V4.92841L8.08909 6.00582C7.76366 6.33126 7.23602 6.33126 6.91058 6.00582C6.58514 5.68039 6.58514 5.15275 6.91058 4.82731L9.70521 2.03268C9.86793 1.86997 10.1317 1.86996 10.2945 2.03268L13.0891 4.82731C13.4145 5.15275 13.4145 5.68039 13.0891 6.00582Z"
              fill="#FF8200"
            />
            <path
              d="M14.9998 7.08323C16.8408 7.08323 18.3332 8.57562 18.3332 10.4166V14.5832C18.3332 16.4242 16.8408 17.9166 14.9998 17.9166H4.99984C3.15889 17.9166 1.6665 16.4242 1.6665 14.5832V10.4166C1.6665 8.57562 3.15889 7.08323 4.99984 7.08323H6.6665C7.12674 7.08323 7.49984 7.45633 7.49984 7.91657C7.49984 8.37681 7.12674 8.7499 6.6665 8.7499H4.99984C4.07936 8.7499 3.33317 9.49609 3.33317 10.4166V14.5832C3.33317 15.5037 4.07936 16.2499 4.99984 16.2499H14.9998C15.9203 16.2499 16.6665 15.5037 16.6665 14.5832V10.4166C16.6665 9.49609 15.9203 8.7499 14.9998 8.7499H13.3332C12.8729 8.7499 12.4998 8.37681 12.4998 7.91657C12.4998 7.45633 12.8729 7.08323 13.3332 7.08323H14.9998Z"
              fill="#FF8200"
            />
          </svg>
          Export
        </button>
      </div>
      <div className="flex justify-between mt-5">
        <div className="text-[#667085] border border-[#E0E2E7] rounded-md p-1 flex items-center gap-2">
          <label>
            <input
              type="radio"
              name="option"
              value="all-times"
              className="hidden peer"
              checked={selectedOption === "all-times"}
              onChange={() => {
                setSelectedOption("all-times");
                handleRadioChange("all-times");
              }}
            />
            <span className="px-4 py-2 rounded-md cursor-pointer peer-checked:bg-[#ff8200] peer-checked:text-white">
              All Times
            </span>
          </label>

          {/* 12 Months */}
          <label>
            <input
              type="radio"
              name="option"
              value="12-months"
              className="hidden peer"
              checked={selectedOption === "12-months"}
              onChange={() => {
                setSelectedOption("12-months");
                handleRadioChange("12-months");
              }}
            />
            <span className="px-4 py-2 rounded-md cursor-pointer peer-checked:bg-[#ff8200] peer-checked:text-white">
              12 months
            </span>
          </label>

          {/* 30 Days */}
          <label>
            <input
              type="radio"
              name="option"
              value="30-days"
              className="hidden peer"
              checked={selectedOption === "30-days"}
              onChange={() => {
                setSelectedOption("30-days");
                handleRadioChange("30-days");
              }}
            />
            <span className="px-4 py-2 rounded-md cursor-pointer peer-checked:bg-[#ff8200] peer-checked:text-white">
              30 days
            </span>
          </label>

          {/* 7 Days */}
          <label>
            <input
              type="radio"
              name="option"
              value="7-days"
              className="hidden peer"
              checked={selectedOption === "7-days"}
              onChange={() => {
                setSelectedOption("7-days");
                handleRadioChange("7-days");
              }}
            />
            <span className="px-4 py-2 rounded-md cursor-pointer peer-checked:bg-[#ff8200] peer-checked:text-white">
              7 days
            </span>
          </label>

          {/* 24 Hours */}
          <label>
            <input
              type="radio"
              name="option"
              value="24-hours"
              className="hidden peer"
              checked={selectedOption === "24-hours"}
              onChange={() => {
                setSelectedOption("24-hours");
                handleRadioChange("24-hours");
              }}
            />
            <span className="px-4 py-2 rounded-md cursor-pointer peer-checked:bg-[#ff8200] peer-checked:text-white">
              24 hours
            </span>
          </label>
        </div>
        <div className="flex gap-3">
          <button
            className="text-[#667085] border border-[#E0E2E7] rounded-md px-4 py-2 flex items-center gap-2 bg-white"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 2.49984C7.5 2.0396 7.1269 1.6665 6.66667 1.6665C6.20643 1.6665 5.83333 2.0396 5.83333 2.49984H5C3.61929 2.49984 2.5 3.61913 2.5 4.99984V15.8332C2.5 17.2139 3.61929 18.3332 5 18.3332H15C16.3807 18.3332 17.5 17.2139 17.5 15.8332V4.99984C17.5 3.61913 16.3807 2.49984 15 2.49984H14.1667C14.1667 2.0396 13.7936 1.6665 13.3333 1.6665C12.8731 1.6665 12.5 2.0396 12.5 2.49984H7.5ZM15.8333 5.83317V4.99984C15.8333 4.5396 15.4602 4.1665 15 4.1665H14.1667C14.1667 4.62674 13.7936 4.99984 13.3333 4.99984C12.8731 4.99984 12.5 4.62674 12.5 4.1665H7.5C7.5 4.62674 7.1269 4.99984 6.66667 4.99984C6.20643 4.99984 5.83333 4.62674 5.83333 4.1665H5C4.53976 4.1665 4.16667 4.5396 4.16667 4.99984V5.83317H15.8333ZM4.16667 7.49984V15.8332C4.16667 16.2934 4.53976 16.6665 5 16.6665H15C15.4602 16.6665 15.8333 16.2934 15.8333 15.8332V7.49984H4.16667Z"
                fill="#667085"
              />
            </svg>
            Select Dates
          </button>
          {showDatePicker && (
            <div className="absolute z-50 bg-white px-10 py-5 rounded shadow flex gap-5 items-left flex-col right-10 top-60 ">
              <div>Choose duration:</div>
              <div className="flex items-between w-full gap-10">
                <label>From:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-between items-center ">
                <label>To:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  className="px-3 py-1 bg-gray-600 text-white rounded"
                  onClick={() => setShowDatePicker(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-1 bg-[#ff8200] text-white rounded"
                  onClick={filterOrdersByDate}
                >
                  OK
                </button>
              </div>
            </div>
          )}
          {/* <button className='text-[#667085] border border-[#E0E2E7] bg-white rounded-md px-4 py-2 flex items-center gap-2'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.8333 6.66667C10.8333 7.1269 11.2064 7.5 11.6667 7.5C12.1269 7.5 12.5 7.1269 12.5 6.66667V5.83333H16.6667C17.1269 5.83333 17.5 5.46024 17.5 5C17.5 4.53976 17.1269 4.16667 16.6667 4.16667H12.5V3.33333C12.5 2.8731 12.1269 2.5 11.6667 2.5C11.2064 2.5 10.8333 2.8731 10.8333 3.33333V6.66667Z" fill="#667085" />
                            <path d="M2.5 10C2.5 9.53976 2.8731 9.16667 3.33333 9.16667H4.58333C4.81345 9.16667 5 9.35321 5 9.58333V10.4167C5 10.6468 4.81345 10.8333 4.58333 10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 10Z" fill="#667085" />
                            <path d="M7.5 7.5C7.03976 7.5 6.66667 7.8731 6.66667 8.33333V11.6667C6.66667 12.1269 7.03976 12.5 7.5 12.5C7.96024 12.5 8.33333 12.1269 8.33333 11.6667V10.8333H16.6667C17.1269 10.8333 17.5 10.4602 17.5 10C17.5 9.53976 17.1269 9.16667 16.6667 9.16667H8.33333V8.33333C8.33333 7.8731 7.96024 7.5 7.5 7.5Z" fill="#667085" />
                            <path d="M2.5 5C2.5 4.53976 2.8731 4.16667 3.33333 4.16667H8.75C8.98012 4.16667 9.16667 4.35321 9.16667 4.58333V5.41667C9.16667 5.64679 8.98012 5.83333 8.75 5.83333H3.33333C2.8731 5.83333 2.5 5.46024 2.5 5Z" fill="#667085" />
                            <path d="M12.5 13.3333C12.5 12.8731 12.8731 12.5 13.3333 12.5C13.7936 12.5 14.1667 12.8731 14.1667 13.3333V14.1667H16.6667C17.1269 14.1667 17.5 14.5398 17.5 15C17.5 15.4602 17.1269 15.8333 16.6667 15.8333H14.1667V16.6667C14.1667 17.1269 13.7936 17.5 13.3333 17.5C12.8731 17.5 12.5 17.1269 12.5 16.6667V13.3333Z" fill="#667085" />
                            <path d="M2.5 15C2.5 14.5398 2.8731 14.1667 3.33333 14.1667H10.4167C10.6468 14.1667 10.8333 14.3532 10.8333 14.5833V15.4167C10.8333 15.6468 10.6468 15.8333 10.4167 15.8333H3.33333C2.8731 15.8333 2.5 15.4602 2.5 15Z" fill="#667085" />
                        </svg>
                        Filters
                    </button> */}
        </div>
      </div>
      <div className="shadow-md rounded-md border border-[#E0E2E7] mt-5">
        <table className="w-full py-2 rounded-md overflow-hidden ">
          <thead className="bg-[#F9F9FC] font-medium border-b border-[#F0F1F3]">
            <tr>
              <th className="py-4 px-4 text-center font-semibold text-[#344054]">
                OrderID
              </th>
              <th className="py-4 px-4 text-center font-semibold text-[#344054]">
                Date
              </th>
              <th className="py-4 px-4 text-left font-semibold text-[#344054]">
                Address
              </th>
              <th className="py-4 px-4 text-center font-semibold text-[#344054]">
                Total
              </th>
              <th className="py-4 px-4 text-center font-semibold text-[#344054]">
                State
              </th>
              <th className="py-4 px-4 text-center font-semibold text-[#344054]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <AdminOrderItem key={order.id} order={order} button />
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-5 px-6 py-4">
          <div className="text-gray-600 text-sm">
            Page <span className="font-semibold">{page + 1}</span> of{" "}
            <span className="font-semibold">{totalPages || 1}</span>
          </div>

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
  );
}
