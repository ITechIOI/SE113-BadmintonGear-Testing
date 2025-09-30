"use client";
import React, { useEffect, useState } from "react";
import AdminCategoryItem from "@/components/AdminCategoryItem";
import {
  getAllCategories,
  updateCategory,
  createCategory,
  deleteCategory,
} from "@/api/categoryApi";
import { getProductsByCategory } from "@/api/productApi";

export default function ProductCategory() {
  const [categories, setCategories] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);

  // ⬇️ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = () => {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm)
    );
    setDisplayCategories(filteredCategories);
    setCurrentPage(1); // reset về page 1 khi search
  };

  const handleSelectAll = () => {
    const newCheckedState = !isAllChecked;
    setIsAllChecked(newCheckedState);
    setCategories(
      categories.map((category) => ({
        ...category,
        isChecked: newCheckedState,
      }))
    );
  };

  const handleCategoryCheck = (id) => {
    const updateCategories = categories.map((category) =>
      category.id === id
        ? { ...category, isChecked: !category.isChecked }
        : category
    );
    setCategories(updateCategories);
    const allChecked = updateCategories.every((category) => category.isChecked);
    setIsAllChecked(allChecked);
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      if (data.status === 200) {
        const updatedData = data.data.content.map((category) => ({
          ...category,
          isChecked: false,
        }));

        const checkNumberOfProducts = updatedData.map((category) => {
          return getProductsByCategory(category.id).then((products) => {
            return { ...category, products: products || [] };
          });
        });

        Promise.all(checkNumberOfProducts).then((results) => {
          setCategories(results);
          setDisplayCategories(results);
        });
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fupdateCategory = async (id, categoryData) => {
    try {
      const response = await updateCategory(id, categoryData);
      if (response) {
        fetchCategories();
        setEditDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const fcreateCategory = async (categoryData) => {
    try {
      const response = await createCategory(categoryData);
      if (response) {
        fetchCategories();
        setEditDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleEditCategory = (category) => {
    setUpdatedCategory(category);
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setUpdatedCategory(null);
  };

  const fdeleteCategories = async (id) => {
    try {
      const response = await deleteCategory(id);
      if (response) {
        fetchCategories();
      }
    } catch (error) {
      console.error("Failed to delete categories:", error);
    }
  };

  const handleDeleteCategories = () => {
    const selectedCategories = categories.filter(
      (category) => category.isChecked
    );
    if (selectedCategories.length === 0) {
      alert("Please select at least one category to delete.");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedCategories.length} categories?`
      )
    ) {
      selectedCategories.forEach((category) => fdeleteCategories(category.id));
      fetchCategories();
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      fdeleteCategories(id);
    }
  };

  const handleSaveEdit = () => {
    if (!updatedCategory || !updatedCategory.id) {
      fcreateCategory({ name: updatedCategory.name, count: 0 });
    } else if (!updatedCategory || !updatedCategory.name) {
      alert("Please enter a valid category name.");
    } else {
      fupdateCategory(updatedCategory.id, {
        name: updatedCategory.name,
        count: 0,
      });
    }
    setEditDialogOpen(false);
    setUpdatedCategory(null);
    fetchCategories();
  };

  useEffect(() => {
    const anyChecked = categories.some((category) => category.isChecked);
    setIsCheck(anyChecked);
    setDisplayCategories(categories);
  }, [categories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // ⬇️ Pagination logic
  const totalPages = Math.ceil(displayCategories.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const paginatedCategories = displayCategories.slice(
    indexOfFirst,
    indexOfLast
  );

  return (
    <div className="px-2 py-5">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Category</h1>
        </div>
        <div className="flex gap-3">
          <button
            className="bg-[#ff8200] text-white px-4 py-2 rounded-md flex gap-2 items-center"
            onClick={() => {
              setUpdatedCategory({ name: "" });
              setEditDialogOpen(true);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.16667 15.4167C9.16667 15.8769 9.53976 16.25 10 16.25C10.4602 16.25 10.8333 15.8769 10.8333 15.4167V10.8333H15.4167C15.8769 10.8333 16.25 10.4602 16.25 10C16.25 9.53976 15.8769 9.16667 15.4167 9.16667H10.8333V4.58333C10.8333 4.1231 10.4602 3.75 10 3.75C9.53976 3.75 9.16667 4.1231 9.16667 4.58333V9.16667H4.58333C4.1231 9.16667 3.75 9.53976 3.75 10C3.75 10.4602 4.1231 10.8333 4.58333 10.8333H9.16667V15.4167Z"
                fill="white"
              />
            </svg>
            Add Category
          </button>
          {isCheck && (
            <button
              className="bg-[#ff8200] text-white px-4 py-2 rounded-md flex gap-2 items-center"
              onClick={handleDeleteCategories}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.33317 8.12484C8.79341 8.12484 9.1665 8.49793 9.1665 8.95817V13.9582C9.1665 14.4184 8.79341 14.7915 8.33317 14.7915C7.87293 14.7915 7.49984 14.4184 7.49984 13.9582V8.95817C7.49984 8.49793 7.87293 8.12484 8.33317 8.12484Z"
                  fill="#fff"
                />
                <path
                  d="M12.4998 8.95817C12.4998 8.49793 12.1267 8.12484 11.6665 8.12484C11.2063 8.12484 10.8332 8.49793 10.8332 8.95817V13.9582C10.8332 14.4184 11.2063 14.7915 11.6665 14.7915C12.1267 14.7915 12.4998 14.4184 12.4998 13.9582V8.95817Z"
                  fill="#fff"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.9998 4.99984V4.1665C14.9998 2.78579 13.8806 1.6665 12.4998 1.6665H7.49984C6.11913 1.6665 4.99984 2.78579 4.99984 4.1665V4.99984H3.74984C3.2896 4.99984 2.9165 5.37293 2.9165 5.83317C2.9165 6.29341 3.2896 6.6665 3.74984 6.6665H4.1665V15.8332C4.1665 17.2139 5.28579 18.3332 6.6665 18.3332H13.3332C14.7139 18.3332 15.8332 17.2139 15.8332 15.8332V6.6665H16.2498C16.7101 6.6665 17.0832 6.29341 17.0832 5.83317C17.0832 5.37293 16.7101 4.99984 16.2498 4.99984H14.9998ZM12.4998 3.33317H7.49984C7.0396 3.33317 6.6665 3.70627 6.6665 4.1665V4.99984H13.3332V4.1665C13.3332 3.70627 12.9601 3.33317 12.4998 3.33317ZM14.1665 6.6665H5.83317V15.8332C5.83317 16.2934 6.20627 16.6665 6.6665 16.6665H13.3332C13.7934 16.6665 14.1665 16.2934 14.1665 15.8332V6.6665Z"
                  fill="#fff"
                />
              </svg>
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-1 items-center bg-white rounded-md px-4 border border-[#E0E2E7] mt-5">
        <input
          id="searchInput"
          type="text"
          placeholder="Search category..."
          className="px-2 py-2 outline-none"
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <div className="shadow-md rounded-md border border-[#E0E2E7] mt-5">
        <table className="w-full py-2 rounded-md overflow-hidden">
          <thead className="bg-[#F9F9FC] font-medium border-b border-[#F0F1F3]">
            <tr className="text-[#344054] font-semibold rounded-md text-center">
              <th>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-[#ff8200] ml-5 my-5"
                  checked={isAllChecked}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Product</th>
              <th className="py-2 px-4">Added</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-[#344054] font-normal text-center">
            {paginatedCategories.map((category) => (
              <AdminCategoryItem
                key={category.id}
                category={category}
                onCheck={() => handleCategoryCheck(category.id)}
                onDelete={() => handleDeleteCategory(category.id)}
                onEdit={() => handleEditCategory(category)}
              />
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
