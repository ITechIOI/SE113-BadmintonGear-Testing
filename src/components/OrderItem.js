import React from "react";
import { addToCart } from "@/api/cartApi";
import { useRouter } from "next/navigation";

export default function OrderItem(item) {
  const router = useRouter();

  const handleClickBuyAgain = () => {
    console.log("Buy Again clicked for order ID:", item.item.id);
    const formData = {
      productId: item.item.id,
      quantity: 1,
      userId: JSON.parse(localStorage.getItem("user_profile")).id,
    };
    addToCart(formData);
  };

  const handleRate = () => {
    router.push(`/review?orderId=${item.item.id}`);
  };

  return (
    <tr className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* ID */}
      <td className="w-1/4 px-4 py-3 font-medium text-gray-700 text-center">
        {item.item.id}
      </td>

      {/* Total */}
      <td className="px-4 py-3 text-gray-600 text-center">
        {Number(item.item.total).toLocaleString()} $
      </td>

      {/* State */}
      <td
        className={`px-4 py-3 font-semibold text-center ${
          item.item.state === "On Delivery"
            ? "text-[#ff8200]"
            : item.item.state === "Done"
            ? "text-[#08AC45]"
            : "text-[#EA4335]"
        }`}
      >
        {item.item.state}
      </td>

      {/* Action buttons */}
      <td className="w-1/4 px-4 py-3">
        <div className="flex gap-3 justify-center items-center">
          {item.item.state === "pending" && (
            <button className="bg-[#ff8200] hover:bg-[#e56f00] text-white font-medium rounded-md px-3 py-1.5 text-sm transition-colors">
              Pay
            </button>
          )}
          {item.item.state === "completed" && (
            <button
              className="bg-[#ff8200] hover:bg-[#e56f00] text-white font-medium rounded-md px-3 py-1.5 text-sm transition-colors"
              onClick={handleRate}
            >
              Rate
            </button>
          )}
          {(item.item.state === "cancelled" ||
            item.item.state === "completed") && (
            <button
              className="bg-[#08AC45] hover:bg-[#07933d] text-white font-medium rounded-md px-3 py-1.5 text-sm transition-colors"
              onClick={handleClickBuyAgain}
            >
              Buy Again
            </button>
          )}
          {item.item.state === "shipping" && (
            <button className="bg-[#EA4335] hover:bg-[#d93025] text-white font-medium rounded-md px-3 py-1.5 text-sm transition-colors">
              Cancel
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
