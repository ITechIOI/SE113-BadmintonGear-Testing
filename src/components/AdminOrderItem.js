import React from "react";

export default function AdminOrderItem({ order, button }) {
  return (
    <tr className="border-b border-[#F0F1F3] hover:bg-gray-50 text-sm text-[#344054] font-inter">
      {/* OrderID */}
      <td className="py-4 px-4 text-center font-semibold text-[#FF8200] whitespace-nowrap">
        {order.id}
      </td>

      {/* Date */}
      <td className="py-4 px-4 text-center whitespace-nowrap">
        {new Date(order.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </td>

      {/* Address */}
      <td className="py-4 px-4 text-left">
        <div className="font-medium">{order.address}</div>
        <div className="text-xs text-gray-500">{order.phone}</div>
      </td>

      {/* Total */}
      <td className="py-4 px-4 text-center font-medium whitespace-nowrap">
        {order ? Number(order.totalPrice).toLocaleString() : ""} $
      </td>

      {/* Status */}
      <td className="py-4 px-4 text-center">
        {order && (
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize
              ${
                order.status === "pending"
                  ? "bg-[#FDF1E8] text-[#FF8200]"
                  : order.status === "shipped"
                  ? "bg-[#E8F8FD] text-[#13B2E4]"
                  : order.status === "cancelled"
                  ? "bg-[#FEEDEC] text-[#F04438]"
                  : "bg-[#E7F4EE] text-[#0D894F]"
              }`}
          >
            {order.status}
          </span>
        )}
      </td>

      {/* Action buttons */}
      {button && (
        <td className="py-4 px-4 text-center">
          <div className="flex justify-center gap-3">
            <button
              onClick={() =>
                (window.location.href = `/admin/orderdetail?id=${order.id}&mode=view`)
              }
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="View"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.0002 4.1665C15.1085 4.1665 17.5258 7.59147 18.3768 9.19265C18.6477 9.7025 18.6477 10.2972 18.3768 10.807C17.5258 12.4082 15.1085 15.8332 10.0002 15.8332C4.89188 15.8332 2.4746 12.4082 1.62363 10.807C1.35267 10.2972 1.35267 9.7025 1.62363 9.19265C2.4746 7.59147 4.89188 4.1665 10.0002 4.1665ZM10.0002 6.45817C8.0442 6.45817 6.45854 8.04383 6.45854 9.99984C6.45854 11.9558 8.0442 13.5415 10.0002 13.5415C11.9562 13.5415 13.5419 11.9558 13.5419 9.99984C13.5419 8.04383 11.9562 6.45817 10.0002 6.45817Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <button
              onClick={() =>
                (window.location.href = `/admin/orderdetail?id=${order.id}&mode=edit`)
              }
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="Edit"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.3047 6.81991C18.281 5.8436 18.281 4.26069 17.3047 3.28438L16.7155 2.69512C15.7391 1.71881 14.1562 1.71881 13.1799 2.69512L3.69097 12.1841C3.34624 12.5288 3.10982 12.9668 3.01082 13.4442L2.34111 16.6735C2.21932 17.2607 2.73906 17.7805 3.32629 17.6587L6.55565 16.989C7.03302 16.89 7.47103 16.6536 7.81577 16.3089L17.3047 6.81991Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
