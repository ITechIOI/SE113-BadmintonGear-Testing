"use client";
import React, { useState, useEffect } from "react";
import CustomerItem from "@/components/CustomerItem";
import { getAllUsers } from "@/api/userApi";

export default function CustomerPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [customers, setCustomers] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // UI: 1-based
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCustomers = async (page = currentPage, limit = rowsPerPage) => {
    try {
      const response = await getAllUsers(page - 1, limit); // API dùng 0-based page
      if (response && response.content) {
        setCustomers(response.content);
        setTotalPages(response.totalPages || 1);
        console.log("Fetched customers:", response);
      } else {
        console.log("No customer data found");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    if (!searchTerm) {
      fetchCustomers(currentPage, rowsPerPage);
      return;
    }
    // Nếu API chưa có search thì filter local
    const filtered = customers.filter(
      (customer) =>
        (customer.name && customer.name.toLowerCase().includes(searchTerm)) ||
        (customer.phone && customer.phone.toLowerCase().includes(searchTerm)) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm))
    );
    setCustomers(filtered);
    setTotalPages(1);
    setCurrentPage(1);
  };

  const toggleFilter = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    fetchCustomers(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  return (
    <div className="font-inter">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Customer</h1>
          <div id="roadmap" className="flex items-center mt-2">
            <a className="text-[#ff8200]" href="/admin/dashboard">
              Dashboard
            </a>
            <label className="ml-3 mr-3">›</label>
            <a className="text-[#667085]" href="/admin/customer">
              Customer List
            </a>
          </div>
        </div>
        <button className="bg-[#FBE3CA] text-[#ff8200] px-4 py-2 rounded-md flex gap-2 items-center">
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

      {/* Search + Filter */}
      <div className="mt-5 flex justify-between items-center">
        <div className="flex gap-1 items-center bg-white rounded-md px-4 border border-[#E0E2E7]">
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder="Search customer..."
            className="px-2 py-2 outline-none"
          />
        </div>
        <button
          onClick={toggleFilter}
          className="text-[#667085] border border-[#E0E2E7] bg-white rounded-md px-4 py-2 flex items-center gap-2"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8333 6.66667C10.8333 7.1269 11.2064 7.5 11.6667 7.5C12.1269 7.5 12.5 7.1269 12.5 6.66667V5.83333H16.6667C17.1269 5.83333 17.5 5.46024 17.5 5C17.5 4.53976 17.1269 4.16667 16.6667 4.16667H12.5V3.33333C12.5 2.8731 12.1269 2.5 11.6667 2.5C11.2064 2.5 10.8333 2.8731 10.8333 3.33333V6.66667Z"
              fill="#667085"
            />
            <path
              d="M2.5 10C2.5 9.53976 2.8731 9.16667 3.33333 9.16667H4.58333C4.81345 9.16667 5 9.35321 5 9.58333V10.4167C5 10.6468 4.81345 10.8333 4.58333 10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 10Z"
              fill="#667085"
            />
            <path
              d="M7.5 7.5C7.03976 7.5 6.66667 7.8731 6.66667 8.33333V11.6667C6.66667 12.1269 7.03976 12.5 7.5 12.5C7.96024 12.5 8.33333 12.1269 8.33333 11.6667V10.8333H16.6667C17.1269 10.8333 17.5 10.4602 17.5 10C17.5 9.53976 17.1269 9.16667 16.6667 9.16667H8.33333V8.33333C8.33333 7.8731 7.96024 7.5 7.5 7.5Z"
              fill="#667085"
            />
            <path
              d="M2.5 5C2.5 4.53976 2.8731 4.16667 3.33333 4.16667H8.75C8.98012 4.16667 9.16667 4.35321 9.16667 4.58333V5.41667C9.16667 5.64679 8.98012 5.83333 8.75 5.83333H3.33333C2.8731 5.83333 2.5 5.46024 2.5 5Z"
              fill="#667085"
            />
            <path
              d="M12.5 13.3333C12.5 12.8731 12.8731 12.5 13.3333 12.5C13.7936 12.5 14.1667 12.8731 14.1667 13.3333V14.1667H16.6667C17.1269 14.1667 17.5 14.5398 17.5 15C17.5 15.4602 17.1269 15.8333 16.6667 15.8333H14.1667V16.6667C14.1667 17.1269 13.7936 17.5 13.3333 17.5C12.8731 17.5 12.5 17.1269 12.5 16.6667V13.3333Z"
              fill="#667085"
            />
            <path
              d="M2.5 15C2.5 14.5398 2.8731 14.1667 3.33333 14.1667H10.4167C10.6468 14.1667 10.8333 14.3532 10.8333 14.5833V15.4167C10.8333 15.6468 10.6468 15.8333 10.4167 15.8333H3.33333C2.8731 15.8333 2.5 15.4602 2.5 15Z"
              fill="#667085"
            />
          </svg>
          Filters
        </button>
      </div>

      {/* Filter popup */}
      {showFilters && (
        <div className="absolute right-10 mt-2 bg-white p-6 rounded-md shadow-lg min-w-[350px] z-50">
          <h2 className="text-xl font-bold mb-4">Filter Customers</h2>
          <div className="mb-4">
            <label className="block mb-2">Balance</label>
            <input type="range" min={0} max={100000} className="w-full" />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 bg-[#ff8200] text-white rounded"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="shadow-md rounded-md border border-[#E0E2E7] mt-5">
        <table className="w-full py-2 rounded-md overflow-hidden px-10">
          <thead className="bg-[#F9F9FC] font-medium border-b border-[#F0F1F3]">
            <tr className="text-center text-[#344054] font-semibold rounded-md">
              <th className="py-2 w-1/5">Customer</th>
              <th className="py-2 px-4 w-1/5">Email</th>
              <th className="py-2 px-4 w-1/5">Gender</th>
              <th className="py-2 px-4 w-1/5">Phone</th>
              <th className="py-2 px-4 w-1/5">Role</th>
            </tr>
          </thead>
          <tbody className="text-[#344054] font-normal text-center">
            {customers.map((customer) => (
              <CustomerItem key={customer.id} customer={customer} />
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-5 px-6 py-4 bg-[#F9FAFB]">
          <div className="text-gray-600 text-sm">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages || 1}</span>
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
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
  );
}
