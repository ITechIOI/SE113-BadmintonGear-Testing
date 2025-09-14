import React from "react";

export default function PromotionItem({ promo }) {
  // Đổi format của ngày thành DD/MM/YYYY - DD/MM/YYYY
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gradient-to-r from-orange-100 to-white rounded-xl shadow-md p-6 border border-orange-200 hover:shadow-lg transition duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-gray-800">{promo.name}</h3>
          <span className="bg-[#ff8200] text-white px-4 py-1 rounded-full text-lg font-semibold shadow-sm">
            -{promo.discount}%
          </span>
        </div>

        {/* Body */}
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Code:</span>{" "}
            <span className="bg-gray-900 text-white px-2 py-1 rounded-md font-mono text-sm tracking-wide">
              {promo.code}
            </span>
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Valid:</span>{" "}
            <span className="text-gray-800">
              {formatDate(promo.start)} → {formatDate(promo.end)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
