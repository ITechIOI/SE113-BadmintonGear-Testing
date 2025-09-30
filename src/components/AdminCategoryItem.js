import React from "react";

export default function AdminCategoryItem({
  category,
  onCheck,
  onDelete,
  onEdit,
}) {
  const numOfProduct = category.products ? category.products.length : 0; // Số lượng sản phẩm trong danh mục
  return (
    <tr className="bg-white shadow-md border-b border-[#F0F1F3]">
      <td>
        <input
          type="checkbox"
          className="w-5 h-5 accent-[#ff8200] ml-5"
          checked={!!category.isChecked}
          onChange={onCheck}
        />
      </td>
      <td className="py-4">
        <div className="flex items-center gap-2">
          <label className="font-medium text-black">{category.name}</label>
        </div>
      </td>
      <td className="">{numOfProduct}</td>
      <td>
        {new Date(category.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </td>
      <td className="flex justify-center items-center py-4">
        <div className="flex items-center gap-7 ">
          <button onClick={onEdit} className="cursor-pointer">
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
                d="M17.3047 6.81991C18.281 5.8436 18.281 4.26069 17.3047 3.28438L16.7155 2.69512C15.7391 1.71881 14.1562 1.71881 13.1799 2.69512L3.69097 12.1841C3.34624 12.5288 3.10982 12.9668 3.01082 13.4442L2.34111 16.6735C2.21932 17.2607 2.73906 17.7805 3.32629 17.6587L6.55565 16.989C7.03302 16.89 7.47103 16.6536 7.81577 16.3089L17.3047 6.81991ZM16.1262 4.46289L15.5369 3.87363C15.2115 3.5482 14.6839 3.5482 14.3584 3.87363L13.4745 4.75755L15.2423 6.52531L16.1262 5.6414C16.4516 5.31596 16.4516 4.78833 16.1262 4.46289ZM14.0638 7.70382L12.296 5.93606L4.86948 13.3626C4.75457 13.4775 4.67577 13.6235 4.64277 13.7826L4.23082 15.769L6.21721 15.3571C6.37634 15.3241 6.52234 15.2453 6.63726 15.1303L14.0638 7.70382Z"
                fill="#667085"
              />
            </svg>
          </button>
          <button onClick={onDelete} className="cursor-pointer">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.33317 8.12484C8.79341 8.12484 9.1665 8.49793 9.1665 8.95817V13.9582C9.1665 14.4184 8.79341 14.7915 8.33317 14.7915C7.87293 14.7915 7.49984 14.4184 7.49984 13.9582V8.95817C7.49984 8.49793 7.87293 8.12484 8.33317 8.12484Z"
                fill="#667085"
              />
              <path
                d="M12.4998 8.95817C12.4998 8.49793 12.1267 8.12484 11.6665 8.12484C11.2063 8.12484 10.8332 8.49793 10.8332 8.95817V13.9582C10.8332 14.4184 11.2063 14.7915 11.6665 14.7915C12.1267 14.7915 12.4998 14.4184 12.4998 13.9582V8.95817Z"
                fill="#667085"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.9998 4.99984V4.1665C14.9998 2.78579 13.8806 1.6665 12.4998 1.6665H7.49984C6.11913 1.6665 4.99984 2.78579 4.99984 4.1665V4.99984H3.74984C3.2896 4.99984 2.9165 5.37293 2.9165 5.83317C2.9165 6.29341 3.2896 6.6665 3.74984 6.6665H4.1665V15.8332C4.1665 17.2139 5.28579 18.3332 6.6665 18.3332H13.3332C14.7139 18.3332 15.8332 17.2139 15.8332 15.8332V6.6665H16.2498C16.7101 6.6665 17.0832 6.29341 17.0832 5.83317C17.0832 5.37293 16.7101 4.99984 16.2498 4.99984H14.9998ZM12.4998 3.33317H7.49984C7.0396 3.33317 6.6665 3.70627 6.6665 4.1665V4.99984H13.3332V4.1665C13.3332 3.70627 12.9601 3.33317 12.4998 3.33317ZM14.1665 6.6665H5.83317V15.8332C5.83317 16.2934 6.20627 16.6665 6.6665 16.6665H13.3332C13.7934 16.6665 14.1665 16.2934 14.1665 15.8332V6.6665Z"
                fill="#667085"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
